import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import logoUNAL from '../../assets/logoUNAL_man.png';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import "../../../src/sass/Act/FormComponent.scss";
import FormFieldsComponent from '../../Components/Act/FormFieldsComponent';
import ParticipantsComponent from '../../Components/Participants/ParticipantsComponent';
import OrderPaperComponent from '../../Components/Act/OrderPaperComponent';
import { getCurrentDateTime } from '../../utils/actUtils';
import AuthContext from '../../Components/Auth/AuthContext';

const FormComponentC = () => {
    const [formData, setFormData] = useState({
        actId: '',
        date: '',
        place: 'Departamento de Informática y Computación',
        time: '',
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const navigate = useNavigate();
    const [participants, setParticipants] = useState([]);
    const [orderPapers, setOrderPapers] = useState([]);
    const [requests, setRequests] = useState([]);
    const [mobilityData, setMobilityData] = useState([]);
    const { auth } = useContext(AuthContext);
    useEffect(() => {
        getParticipants();
        const { currentDate, currentTime } = getCurrentDateTime();
        setFormData((prevData) => ({
            ...prevData,
            date: currentDate,
            time: currentTime,
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const isFormValid = () => {
        const { actId, date, place, time } = formData;
        return actId && date && place && time;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isFormValid()) {
            await createCreatePreAct();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Campos incompletos',
                text: 'Por favor, complete todos los campos requeridos.',
                confirmButtonText: 'Aceptar'
            });
        }
    };

    const addDetailOrderPaper = async (idOrderPaper, idRequest) => {
        try {
            const url = `http://localhost:8080/api/detailOrderPaper/newDetailOrderPaper/${idOrderPaper}/${idRequest}`;
            await axios.post(url,{},{
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              });
        } catch (error) {
            console.error('Error creating detailOrderPaper:', error);
        }
    };

    const addOrderPaper = async (orderPaperList, actId) => {
        for (const order of orderPaperList) {
            try {
                const url = `http://localhost:8080/api/orderPaper/newOrderPaper/${actId}`;
                const response = await axios.post(url, { description: order.description },{
                    headers: {
                      Authorization: `Bearer ${auth.token}`
                    }
                  });
                for (const requestId of order.requests) {
                    await addDetailOrderPaper(response.data.id, requestId);
                }
            } catch (error) {
                console.error('Error creating orderPaper:', error);
            }
        }
    };

    const createCreatePreAct = async () => {
        try {
            setIsButtonDisabled(true);
            const response = await axios.post('http://localhost:8080/api/act/newAct', formData,{
                headers: {
                    Authorization: `Bearer ${auth.token}`
                  }
              });
            Swal.fire({
                icon: 'success',
                title: '¡Acta creada!',
                text: 'El acta ha sido creada exitosamente.',
                confirmButtonText: 'Aceptar',
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await addOrderPaper(orderPapers, response.data.actId);
                    await saveParticipantsToAct(response.data.actId);
                    navigate('/acts');
                }
                setIsButtonDisabled(false);
            });

            setFormData({
                actId: '',
                date: '',
                place: 'Departamento de Informática y Computación',
                time: ''
            });
        } catch (error) {
            console.error("Error creating act:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error al crear el acta',
                text: 'Ocurrió un error al intentar crear el acta. Por favor, intente nuevamente.',
                confirmButtonText: 'Aceptar'
            });
            setIsButtonDisabled(false);
        }
    };

    const getParticipants = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/participant/getActiveParticipants',{
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              });
            setParticipants(response.data);
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
    };

    const saveParticipantsToAct = async (actId) => {
        try {
            const requests = participants.map((participant) => {
                const url = `http://localhost:8080/api/act/${actId}/${participant.id}`;
                return axios.post(url,{},{
                    headers: {
                      Authorization: `Bearer ${auth.token}`
                    }
                  });
            });

            await Promise.all(requests);
            console.log('All participants saved successfully.');
        } catch (error) {
            console.error('Error saving participants to act:', error);
        }
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
            const orderPaperPromises = orderPapers.map(async (orderPaper, index) => {
                const orderPaperRequests = await Promise.all(
                    orderPaper.requests.map(async (requestId) => {
                        const request = await fetchRequest(requestId);
                        return request;
                    })
                );
                fetchedRequests[index] = orderPaperRequests;
            });

            await Promise.all(orderPaperPromises);
            setRequests(fetchedRequests);
        };

        if (orderPapers.length > 0) {
            fetchRequests();
        }
    }, [orderPapers]);

    const handleOrderPaperClick = (index) => {
        const updatedOrderPapers = [...orderPapers];
        updatedOrderPapers.splice(index, 1);
        setOrderPapers(updatedOrderPapers);
    };

    return (
        <div className="acta-container">
            <div className='center'>
                <img src={logoUNAL} alt="Logo UNAL" className="logo img-fluid" />
            </div>
            <h6 className='title-act'>COMITÉ ASESOR DE ADMINISTRACIÓN DE SISTEMAS INFORMÁTICOS</h6>
            <form onSubmit={handleSubmit}>
                <FormFieldsComponent formData={formData} handleChange={handleChange} />
                <ParticipantsComponent />
                <OrderPaperComponent
                    orderPapers={orderPapers}
                    setOrderPapers={setOrderPapers}
                />
                <div className="input-container">
                    <ol>
                        {orderPapers.map((orderPaper, index) => (
                            <li key={index} className="order-paper-item">
                                <h5 className='delete-item' onClick={() => handleOrderPaperClick(index)}>{orderPaper.description}</h5>
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="develop-container">
                    {orderPapers.map((orderPaper, index) => (
                        orderPaper.requests.map((requestOrderPaper, idx) => (
                            Object.entries(requests).map(([reqIndex, requestObj]) => (
                                Object.entries(requestObj).map(([subReqIndex, request]) => {
                                    if (request.idRequest === requestOrderPaper) {
                                        return (
                                            <li key={request.idRequest} className="no-bullet">
                                                <p dangerouslySetInnerHTML={{ __html: request.contentRequest.description }}></p>
                                                <div className='divisor-line'></div>
                                            </li>
                                        );
                                    } else {
                                        return null;
                                    }
                                })
                            ))
                        ))
                    ))}
                </div>

                <div className='center'>
                    <button disabled={isButtonDisabled} type="submit" className="btn-dev">
                        Guardar PreActa
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FormComponentC;
