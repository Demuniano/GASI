import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';
import "../../src/sass/Act/ActLayout.scss";
import logoUNAL from '../assets/unalManLogo.png';
import AuthContext from '../Components/Auth/AuthContext';
import { exportToWord } from './exportToWord';
const ActLayout = () => {
    const { auth } = useContext(AuthContext);
    const [formData, setFormData] = useState({
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
    const [detailOrderPaper, setDetailOrderPaper] = useState([]);
    const [documentStructure, setDocumentStructure] = useState({
        quorum: "1. VERIFICACIÓN DEL QUÓRUM: Con la asistencia de miembros principales se verificó el Quórum.",
        studentAffairs: {
          siaRequests: [],
          manualRequests: [],
        },
        various: [],
      });
      
    
      useEffect(() => {
        const structure = {
          quorum: "1. VERIFICACIÓN DEL QUÓRUM: Con la asistencia de miembros principales se verificó el Quórum.",
          studentAffairs: {
            siaRequests: [],
            manualRequests: [],
          },
          various: [],
        };
      
        orderPapers.forEach(orderPaper => {
          orderPaper.requests.forEach(requestOrderPaper => {
            Object.values(requests).forEach(requestObj => {
              Object.values(requestObj).forEach(request => {
                if (request.idRequest === requestOrderPaper) {
                  const requestData = {
                    id: request.idRequest,
                    description: request.contentRequest.description, // Limpiar etiquetas HTML
                    recommendation: recommendations[request.idRequest] ? recommendations[request.idRequest][0] : "",
                  };
      
                  if (orderPaper.description.toLowerCase() === 'varios') {
                    structure.various.push(requestData);
                  } else if (request.source === 'sia') {
                    structure.studentAffairs.siaRequests.push(requestData);
                  } else if (request.source === 'manual') {
                    structure.studentAffairs.manualRequests.push(requestData);
                  }
                }
              });
            });
          });
        });
      
        setDocumentStructure(structure);
      }, [orderPapers, requests, recommendations]);
      
 
    
    
    
    
    
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
                newRecommendations[detailOrderPaper.idRequest] = [recommDescriptions, requestState.state];
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
    const downloadWord = async () => {
        exportToWord({ idAct, participants, orderPapers, documentStructure, formData });
    };
    return ( 
        <div className='actLayout acta-container'>
            <div className="header">
                <h1>ACTA {idAct} COMITÉ ASESOR DE PREGRADO</h1>
            </div>
            <div className='center'>
                <img src={logoUNAL} alt="Logo UNAL" className="logo img-fluid logoActLayout" />
            </div>
            <div className='actTitle'>
                <p>ÁREA CURRICULAR DE INFORMÁTICA Y COMPUTACIÓN</p>
                <p>COMITÉ ASESOR DE PREGRADO</p>
                <p>ACTA {idAct}</p>
            </div>
            <div className="layoutContent">
                <p><strong>Fecha:</strong> {formData.date}</p>
                <p><strong>Lugar:</strong> {formData.place}</p>
            </div>
            <div className='participantsLayout layoutContent'>
                <div className="">
                    <label htmlFor="participants"><strong>Asistentes:</strong></label>
                </div>
                <div className="">
                    <ul>
                    {participants
                        .filter((participant) => participant.type === 'asistente')
                        .map((participant, index) => (
                        <li key={index}>
                            {(participant.role === 'profesor' || participant.rol === 'Representante de profesores') 
                            ? `Prof. ${participant.name}`
                            : participant.name}
                        </li>
                        ))}
                    </ul>
                </div>
                <div className="">
                    <label htmlFor="participants"><strong>Invitados:</strong></label>
                </div>
                <div className="">
                    <ul>
                    {participants
                        .filter((participant) => participant.type === 'invitado')
                        .map((participant, index) => (
                        <li key={index}>
                            {(participant.role === 'profesor' || participant.rol === 'Representante de profesores') 
                            ? `Prof. ${participant.name}`
                            : participant.name}
                        </li>
                        ))}
                    </ul>
                </div>
                <div className="">
                    <label htmlFor="participants"><strong>Ausentes:</strong></label>
                </div>
                <div className="">
                    <ul>
                    {participants
                        .filter((participant) => participant.type === 'ausente')
                        .map((participant, index) => (
                        <li key={index}>
                            {(participant.role === 'profesor' || participant.rol === 'Representante de profesores') 
                            ? `Prof. ${participant.name}`
                            : participant.name}
                        </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='participantsLayout layoutContent'>
                <p><strong>ORDEN DEL DÍA:</strong></p>
                <div className="input-container">
                    <ol>
                        {orderPapers.map((orderPaper, index) => (
                            <li key={index}>
                                <p className='uppercase'>{orderPaper.description}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
            <div className='participantsLayout layoutContent'>
                <p><strong>DESARROLLO:</strong></p>
                <ol className="custom-list">
                    <li><strong>VERIFICACIÓN DEL QUÓRUM: </strong>Con la asistencia de miembros principales se verificó el Quórum.</li>

                    <li><strong>ASUNTOS ESTUDIANTILES</strong>
                    <ol className="nested-list">
                        <li><strong>SOLICITUDES MÓDULO SIASE:</strong>
                        <ol className='mt-4'>
                            {documentStructure.studentAffairs.siaRequests.map(request => (
                            <li key={request.id}>
                                <p dangerouslySetInnerHTML={{ __html: request.description }}></p>
                                {request.recommendation && (
                                <>
                                    <p><strong>RECOMENDACIÓN:</strong></p>
                                    <p dangerouslySetInnerHTML={{ __html: request.recommendation }}></p>
                                </>
                                )}
                            </li>
                            ))}
                        </ol>
                        </li>
                        <li><strong>SOLICITUDES MANUALES:</strong>
                        <ol className='mt-4'>
                            {documentStructure.studentAffairs.manualRequests.map(request => (
                            <li key={request.id}>
                                <p dangerouslySetInnerHTML={{ __html: request.description }}></p>
                                {request.recommendation && (
                                <div className='mb-4'>
                                    <p><strong>RECOMENDACIÓN:</strong></p>
                                    <p dangerouslySetInnerHTML={{ __html: request.recommendation }}></p>
                                </div>
                                )}
                            </li>
                            ))}
                        </ol>
                        </li>
                    </ol>
                    </li>

                    <li><strong>VARIOS:</strong></li>
                    <ol className='mt-4'>
                    {documentStructure.various.map(request => (
                        <li key={request.id}>
                        <p dangerouslySetInnerHTML={{ __html: request.description }}></p>
                        {request.recommendation && (
                            <div className='mb-4'>
                            <p><strong>RECOMENDACIÓN:</strong></p>
                            <p dangerouslySetInnerHTML={{ __html: request.recommendation }}></p>
                            </div>
                        )}
                        </li>
                    ))}
                    </ol>
                </ol>
                </div>


            <div className='layoutContent firm'> 
                <p><strong>Luz Angela Aristizabal</strong></p>
                <p>Presidente</p>
                <p>Comité Asesor de Pregrado</p>
            </div>
            <div className='center'>
                <button onClick={downloadWord} className="btn-dev export-button">Exportar a Word</button>
            </div>
        </div>
     );
}
 
export default ActLayout;
