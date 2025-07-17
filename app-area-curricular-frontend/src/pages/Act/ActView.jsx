import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import logoUNAL from '../../assets/logoUNAL_man.png';
import FormFieldsComponent from '../../Components/Act/FormFieldsComponent';
import ParticipantsComponent from '../../Components/Participants/ParticipantsActComponent';
import { detectIndicator } from '../../utils/actUtils';
import "../../../src/sass/Act/FormComponent.scss";
import "../../../src/sass/Act/Act.scss";
import AuthContext from '../../Components/Auth/AuthContext';

const ActViewPage = () => {
    const [formData, setFormData] = useState({
        actId: '',
        date: '',
        place: 'Departamento de Informática y Computación',
        time: '',
    });
    const { idAct } = useParams();
    const navigate = useNavigate();
    const [participants, setParticipants] = useState([]);
    const [orderPapers, setOrderPapers] = useState([]);
    const [requests, setRequests] = useState({});
    const [recommendations, setRecommendations] = useState([]);
    const [indicators, setIndicators] = useState({});
    const [mobilityData, setMobilityData] = useState([]);
    const [isModalOpenRecomm, setIsModalOpenRecomm] = useState(false);
    const [detailOrderPaper, setDetailOrderPaper] = useState([]);
    const [isFormDisabled, setIsFormDisabled] = useState(true); // Estado para manejar si el formulario está deshabilitado o no
    const { auth } = useContext(AuthContext);
    const getOrderPapersByActId = async (id) => {
        const url = `http://localhost:8080/api/orderPaper/act/${id}`;
        try {
            const response = await axios.get(url,{
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              });
            const orderPaperPromises = response.data.map(async (orderPaper) => {
                const requestOrder = await getRequestByDetailOrderPaper(orderPaper.id);
                getDetailOrderPaper(orderPaper.detailOrderPapers);
                return {
                    id: orderPaper.id,
                    description: orderPaper.description,
                    requests: requestOrder,
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
        });
        const newDetailOrderPapers = await Promise.all(detailOrderPromises);
        setDetailOrderPaper(newDetailOrderPapers);
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

    const getRequestByDetailOrderPaper = async (idOrderPaper) => {
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
                newRecommendations[detailOrderPaper.idDetailOrderPaper] = [recommDescriptions, requestState.state];
            }
        });
        await Promise.all(recommendationPromises);
        setRecommendations(newRecommendations);
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

    useEffect(() => {
        getActById(idAct);
    }, [idAct]);

    useEffect(() => {
        loadRecommendations();
        if (detailOrderPaper.length > 0) {
            loadRecommendations();
        }
    }, [detailOrderPaper]);

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

    return (
        <div className="acta-container">
            <div className='center'>
                <img src={logoUNAL} alt="Logo UNAL" className="logo img-fluid" />
            </div>
            <h6 className='title-act'>COMITÉ ASESOR DE ADMINISTRACIÓN DE SISTEMAS INFORMÁTICOS</h6>
            <form>
                <FormFieldsComponent formData={formData} disabled={isFormDisabled} />
                <ParticipantsComponent participants={participants} disabled={isFormDisabled} />
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
                                                    const mobility = mobilityData.find(mob => mob.idRequest === request.idRequest);
                                                    return (
                                                        <li key={request.idRequest}>
                                                            <p dangerouslySetInnerHTML={{ __html: request.contentRequest.description }}></p>
                                                            <div className='divisor-line'></div>
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
                <div className="develop-container">
                    <h5 htmlFor="recommendations">Recomendaciones:</h5>
                    <ol>
                        {Object.entries(recommendations).map(([requestId, recommendationList]) => (
                            <li key={requestId}>
                                <p className=''>Recomendación para la solicitud {requestId}:</p>
                                <p><strong>Solicitud: {recommendationList[1]}</strong></p>
                                <ul>
                                    <li key={0}>{recommendationList[0]}</li>
                                </ul>
                            </li>
                        ))}
                    </ol>
                </div>
            </form>
        </div>
    );
}

export default ActViewPage;
