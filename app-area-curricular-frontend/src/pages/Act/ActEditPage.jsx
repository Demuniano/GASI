import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import logoUNAL from '../../assets/logoUNAL_man.png';
import FormFieldsComponent from '../../Components/Act/FormFieldsComponent';
import ParticipantsComponent from '../../Components/Participants/ParticipantsActComponent';
import Swal from 'sweetalert2';
import RecommendationModal from '../../Components/Act/RecommendationComponent';
import { detectIndicator } from '../../utils/actUtils';
import MobilityModal from '../../Components/Act/MobilityComponent';
import "../../../src/sass/Act/FormComponent.scss";
import "../../../src/sass/Act/Act.scss";
import AuthContext from '../../Components/Auth/AuthContext';

const ActEditPage = () => {
    const [formData, setFormData] = useState({
        actId: '',
        date: '',
        place: 'Departamento de Informática y Computación',
        time: '',
    });
    const { idAct } = useParams();
    const  navigate = useNavigate();
    const [participants, setParticipants] = useState([]);
    const [orderPapers, setOrderPapers] = useState([]);
    const [requests, setRequests] = useState({});
    const [recommendations, setRecommendations] = useState([]);
    const [currentRequestId, setCurrentRequestId] = useState(null);
    const [indicators, setIndicators] = useState({});
    const [modalIsOpenMobility, setModalIsOpenMobility] = useState(false);
    const [editMobilityData, setEditMobilityData] = useState(null);
    const [mobilityData, setMobilityData] = useState([]);
    const [isModalOpenRecomm, setIsModalOpenRecomm] = useState(false);
    const [detailOrderPaper, setDetailOrderPaper] = useState([]);
    const [isFormDisabled, setIsFormDisabled] = useState(true); 
    const { auth } = useContext(AuthContext);
    const getOrderPapersByActId = async (id) => {
        const url = `http://localhost:8080/api/orderPaper/act/${id}`;
        try {
            const response = await axios.get(url,{
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              });
            console.log(response.data, 'orderPapers');
            const orderPaperPromises = response.data.map(async (orderPaper) => {

                const requestOrder = await getRequestByDetailOrderPaper(orderPaper.id);
                getDetailOrderPaper(orderPaper.detailOrderPapers);
                return {
                    id: orderPaper.id,
                    description: orderPaper.description,
                    requests: requestOrder, // Directamente asignar los requests obtenidos
                    detailOrderPapers: orderPaper.detailOrderPapers
                };
            });
            const newOrderPapers = await Promise.all(orderPaperPromises);
            setOrderPapers(newOrderPapers);
        } catch (error) {
            console.error('Error fetching order papers:', error);
        }
    };
    const getDetailOrderPaper = async (detailOrderPapers) => {
        const detailOrderPromises = detailOrderPapers.map(async (id) => {
            const url = `http://localhost:8080/api/detailOrderPaper/dto/${id.idDetailOrderPaper}`;
            try {
                const response = await axios.get(url,{
                    headers: {
                      Authorization: `Bearer ${auth.token}`
                    }
                  });
                return response.data;
            } catch (error) {
                console.error('Error fetching detail order paper:', error);
            }
        }
        );
        const newDetailOrderPapers = await Promise.all(detailOrderPromises);
        setDetailOrderPaper(newDetailOrderPapers);
    };
    const handleSubmitMobility = (data) => {
        const newData = { ...data, idRequest: currentRequestId };
        if (editMobilityData) {
            setMobilityData((prevData) => prevData.map(mobility => 
                mobility.idRequest === editMobilityData.idRequest ? newData : mobility
            ));
        } else {
            setMobilityData((prevData) => [...prevData, newData]);
        }
        setCurrentRequestId(null);
        closeModalMobility();
    };
    const closeModalMobility = () => {
        setModalIsOpenMobility(false);
        setEditMobilityData(null);
    };
    const openModalMobility = (idRequest, mobility = null) => {
        setCurrentRequestId(idRequest);
        setEditMobilityData(mobility);
        setModalIsOpenMobility(true);
    };
    const saveCourses = async (courseData, mobilityId) => {
        try {
            for (const data of courseData) {
                const url = `http://localhost:8080/api/course/newCourse/${mobilityId}`;

                const subject = { 
                    name: data
                }
                console.log(subject, "data subjet");
                const response = await axios.post(url, subject,{
                    headers: {
                      Authorization: `Bearer ${auth.token}`
                    }
                  });
                console.log(response.data);
            }
        } catch (error) {
            console.error('Error saving course data:', error);
        }
    };
    
    const saveMobilityIndicator = async (mobilityData) => {
        try {
            for (const data of mobilityData) {
                if (data.idMobility) {
                    updateMobility(data);
                }else{
                    // Desestructurar el objeto y excluir los campos no deseados
                    const { subjects, idRequest, ...filteredData } = data;
        
                    const url = `http://localhost:8080/api/mobility/newMobility/1/${idRequest}`;
                    const response = await axios.post(url, filteredData,{
                        headers: {
                          Authorization: `Bearer ${auth.token}`
                        }
                      });
                    console.log(response.data);
        
                    // Llamar a saveCourses si es necesario
                    saveCourses(data.subjects, response.data.idMobility);
                }
            }
        } catch (error) {
            console.error('Error saving mobility data:', error);
        }
    };
    const getParticipants = async (id) => {
        const url = `http://localhost:8080/api/participant/byAct/${id}`;
        try {
            const response = await axios.get(url,{
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              });
            setParticipants(response.data);
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
    };

    const getRequestByDetailOrderPaper = async (idOrderPaper) => { // Obtener las solicitudes de un orderPaper
        const url = `http://localhost:8080/api/detailOrderPaper/${idOrderPaper}/requestIds`;
        try {
            const response = await axios.get(url,{
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              });
            return response.data;
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };
    const recommendationsToSave = async () => {
        detailOrderPaper.map(async (detailOrderPaper) => {
            const reco = recommendations[detailOrderPaper.idRequest];
            console.log(reco, "reco");
            if (reco) {
                console.log(detailOrderPaper.idDetailOrderPaper, reco[1], "reco1");
                await saveRecommendation(detailOrderPaper.idDetailOrderPaper, reco[0]);
                await updateRequest(detailOrderPaper.idRequest, reco[1]);
            }
        });
    };
    const updateRequest = async (idRequest, status) => {
        const url = `http://localhost:8080/api/request/${idRequest}`;
        try {
            await axios.put(url, { state: status },{
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              });
        } catch (error) {
            console.error('Error updating request:', error);
        }
    };
    const saveRecommendation = async (idDetail, recommendation) => {
        try {
            const url = `http://localhost:8080/api/recommendation/newRecommendation/${idDetail}`;
            await axios.post(url, { description: recommendation },{
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              });
        } catch (error) {
            console.error('Error creating recommendation:', error);
        }
    };
    const getActById = async (id) => {
        const url = `http://localhost:8080/api/act/${id}`;
        try {
            const response = await axios.get(url,{
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              });
            setFormData({
                ...formData,
                actId: id || "",
                description: response.data.description || "",
                date: response.data.date || "",
                place: response.data.place || "",
                time: response.data.time || "",
            });
            getParticipants(response.data.actId);
            getOrderPapersByActId(response.data.actId);
        } catch (error) {
            console.error('Error fetching act:', error);
        }
    };
    const updateActById = async (id) => {
        const url = `http://localhost:8080/api/act/${id}`;
        try {
            await axios.put(url, formData,{
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              });
            Swal.fire({
                icon: 'success',
                title: '¡Acta actualizada!',
                text: 'El acta ha sido actualizada exitosamente.',
                confirmButtonText: 'Aceptar',
            }).then((result) => {
                saveMobilityIndicator(mobilityData);
                recommendationsToSave();
                if (result.isConfirmed) {
                    navigate('/acts');
                }
            });
        } catch (error) {
            console.error('Error updating act:', error);
        }
    };
    useEffect(() => {
        getActById(idAct);
    }  , [idAct]);
    const handleSubmit = async (e) => {
        e.preventDefault();
            await updateActById(idAct);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };
    const fetchRequest = async (idRequest) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/request/${idRequest}`,{
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              });
            return response.data;
        } catch (error) {
            console.error('Error fetching request:', error);
        }
    };
    useEffect(() => {
        const fetchRequests = async () => {
            const fetchedRequests = {};
            for (const orderPaper of orderPapers) {
                const orderPaperRequests = [];
                for (const requestId of orderPaper.requests) {
                    const request = await fetchRequest(requestId);
                    if (request) {
                        orderPaperRequests.push(request);
                    }
                }
                fetchedRequests[orderPaper.id] = orderPaperRequests;
            }
            setRequests(fetchedRequests);
        };

        if (orderPapers.length > 0) {
            fetchRequests();
        }
    }, [orderPapers]);

    useEffect(() => {
        const fetchIndicators = async () => {
            const newIndicators = {};
            for (const orderPaper of orderPapers) {
                for (const requestId of orderPaper.requests) {
                    const indicator = await detectIndicator(requestId, auth);
                    newIndicators[requestId] = indicator;
                }
            }
            setIndicators(newIndicators);
        };
    
        if (orderPapers.length > 0) {
            fetchIndicators();
        }
    }, [orderPapers]);
   
    const openRecommendationModal = (requestId) => {
        setCurrentRequestId(requestId);
        setIsModalOpenRecomm(true);
    };
    const handleSaveRecommendation = (recommendation) => {
        if (currentRequestId !== null) {
            setRecommendations((prevState) => ({
                ...prevState,
                [currentRequestId]: [...(prevState[currentRequestId] || []), recommendation[0],recommendation[1]]
            }));
            setIsModalOpenRecomm(false);
            setCurrentRequestId(null);
        }
    };

    const deleteRecommendation = (requestId) => {
        setRecommendations((prevState) => {
            const newState = { ...prevState };
            delete newState[requestId];
            return newState;
        });
    };
    const getRecommendationsByOrderPaperId = async (orderPaperId) => {
        const url = `http://localhost:8080/api/recommendation/detail/${orderPaperId}`;
        try {
            const response = await axios.get(url,{
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              });
            return response.data;
        } catch (error) {
            console.error('Error fetching recommendations:', error);
        }
    };
    const getRequestState = async (idRequest) => {
        const url = `http://localhost:8080/api/request/typeRequest/${idRequest}`;
        try {
            const response = await axios.get(url,{
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              });
            return response.data;
        } catch (error) {
            console.error('Error fetching request state:', error);
            return null;
        }
    };
    const loadRecommendations = async () => {
        const newRecommendations = {};
        const recommendationPromises = detailOrderPaper.map(async (detailOrderPaper) => {
            const recommDescriptions = [];
            const recommendation = await getRecommendationsByOrderPaperId(detailOrderPaper.idDetailOrderPaper);
            if (recommendation !== null) {
                const requestState = await getRequestState(detailOrderPaper.idRequest);
                recommDescriptions.push(recommendation.description);
                newRecommendations[detailOrderPaper.idRequest] = [recommDescriptions, requestState.state];
            }
        });
        await Promise.all(recommendationPromises);
        setRecommendations(newRecommendations);
    };
    useEffect(() => {
        loadRecommendations();
        if (detailOrderPaper.length > 0) {
            loadRecommendations();
        }
    }, [detailOrderPaper]);
    return ( 
        <div className="acta-container">
            <div className='center'>
                <img src={logoUNAL} alt="Logo UNAL" className="logo img-fluid" />
            </div>
            <h6 className='title-act'>COMITÉ ASESOR DE ADMINISTRACIÓN DE SISTEMAS INFORMÁTICOS</h6>
        <form onSubmit={handleSubmit}>
            <FormFieldsComponent formData={formData} disabled={isFormDisabled}/>
            <ParticipantsComponent 
                participants={participants}
            />
            {/* <OrderPaperComponent
                orderPapers={orderPapers}
                setOrderPapers={setOrderPapers}
            /> */}
            <div>
                <div className="input-container">
                    <h5>Orden del día:</h5>
                </div>
                <div className="input-container">
                    <ol>
                        {orderPapers.map((orderPaper, index) => (
                            <li key={index} className="order-paper-item">
                                <h5>{orderPaper.description}</h5>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
            <div className="develop-container">
                {console.log(orderPapers, "orderPapers")}
                    <h5>Desarrollo:</h5>
                    <ol className='mt-4'>
                        {orderPapers.map((orderPaper, index) => (
                            <li key={index}>
                                <h5>{orderPaper.description}</h5>
                                <ul>
                                    {orderPaper.requests.map((requestOrderPaper, idx) => {
                                        return Object.entries(requests).map(([index, requestObj]) => {
                                            return Object.entries(requestObj).map(([index, request]) => {
                                                if (request.idRequest === requestOrderPaper) {
                                                    const hasRecommendation = recommendations[request.idRequest];
                                                    {console.log(hasRecommendation, "hasRecommendation")}
                                                    const mobility = mobilityData.find(mob => mob.idRequest === request.idRequest);
                                                    return (
                                                        <li key={request.idRequest}>
                                                            <p dangerouslySetInnerHTML={{ __html: request.contentRequest.description }}></p>
                                                            {indicators[request.idRequest] && (
                                                                <button
                                                                    type="button"
                                                                    className="btn btn-warning"
                                                                    onClick={() => openModalMobility(request.idRequest, mobility)}
                                                                >
                                                                    {mobility ? "Editar Indicador" : "Indicador"}
                                                                </button>
                                                            )}                                                   
                                                            {hasRecommendation ? (
                                                                <>
                                                                    <p className='delete-item' onClick={() => deleteRecommendation(request.idRequest)}><strong>RECOMENDACIÓN:</strong></p>
                                                                    <p><strong>Solicitud: </strong> {hasRecommendation[1]}</p>
                                                                    
                                                                    <p className='ms-4' key={0} dangerouslySetInnerHTML={{ __html: hasRecommendation[0] }}></p>
                                                                    
                                                         
                                                                <div className='divisor-line'></div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className="button-container">
                                                                        <button className='btn btn-primary' type='button' onClick={() => openRecommendationModal(request.idRequest)}>Recomendación</button>
                                                                    </div>
                                                                    <div className='divisor-line'></div>
                                                                </>
                                                            )}
                                                        </li>
                                                    );
                                                }
                                                return null;
                                            });
                                        });
                                    })}
                                </ul>
                            </li>
                        ))}
                    </ol>
            </div>


            {/* <div className="develop-container">
                <h5 htmlFor="recommendations">Recomendaciones:</h5>
                {console.log(recommendations,"recommendations")}
                {console.log(detailOrderPaper, "detailOrderPaper")}
                <ol>
                    {Object.entries(recommendations).map(([requestId, recommendationList]) => (
                        <li key={requestId}>
                            <p className='delete-item' onClick={() => deleteRecommendation(requestId)}>Recomendación para la solicitud {requestId}:</p>
                            <p><strong>Solicitud: {recommendationList[1]}</strong></p>
                            <ul>
                            <p ></p>
                                <li key={0} dangerouslySetInnerHTML={{ __html: recommendationList[0] }}></li>
                            </ul>
                        </li>
                    ))}
                </ol>
            </div> */}
            <div className='center'>
                <button type="submit" className="btn-dev">
                    Guardar Acta
                </button>
            </div>
        </form>
        <RecommendationModal
                isOpen={isModalOpenRecomm}
                onClose={() => setIsModalOpenRecomm(false)}
                onSave={handleSaveRecommendation}
        />
        <MobilityModal 
                isOpen={modalIsOpenMobility} 
                onRequestClose={closeModalMobility} 
                onSubmit={handleSubmitMobility} 
                editData={editMobilityData} 
            />
    </div>
     );
}
 
export default ActEditPage;