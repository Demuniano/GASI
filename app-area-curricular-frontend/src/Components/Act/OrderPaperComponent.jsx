import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-modal';
import axios from 'axios';
import Swal from 'sweetalert2';
import AuthContext from '../Auth/AuthContext';

const OrderPaperComponent = ({ orderPapers, setOrderPapers }) => {
    const [description, setDescription] = useState('');
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [studentId, setStudentId] = useState('');
    const [studentRequests, setStudentRequests] = useState({});
    const [selectedRequests, setSelectedRequests] = useState({});
    const [requestTypeFilter, setRequestTypeFilter] = useState('');
    const [sourceFilter, setSourceFilter] = useState('');
    const [requestTypes, setRequestTypes] = useState([]);
    const [sources, setSources] = useState([]);
    const [commonDescription, setCommonDescription] = useState('');
    const { auth } = useContext(AuthContext);

    const fetchStudentRequests = async (id) => {
        try {
            const response = await axios.get(`http://localhost:8080/api/request/details/${id}`, {
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
            });
            const requests = response.data;

            setStudentRequests(prevRequests => ({
                ...prevRequests,
                [id]: requests
            }));

            const uniqueRequestTypes = [...new Set(requests.map(req => req.requestTypeName))];
            const uniqueSources = [...new Set(requests.map(req => req.source))];

            setRequestTypes(uniqueRequestTypes);
            setSources(uniqueSources);
        } catch (error) {
            console.error('Error fetching student requests:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudieron cargar las solicitudes del estudiante',
            });
        }
    };

    const handleSearchStudentRequests = () => {
        if (!studentId) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar un ID de estudiante',
            });
            return;
        }
        fetchStudentRequests(studentId);
    };

    const handleAddOrderPaper = () => {
        if (!description) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'La descripción no puede estar vacía',
            });
            return;
        }
        if (Object.values(selectedRequests).flat().length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe seleccionar al menos una solicitud',
            });
            return;
        }

        const newOrderPaper = {
            description,
            requests: Object.values(selectedRequests).flat(),
        };
        setOrderPapers([...orderPapers, newOrderPaper]);
        setDescription('');
        setSelectedRequests({});
        setModalIsOpen(false);
    };

    const handleRequestChange = (studentId, requestId) => {
        setSelectedRequests(prevSelected => {
            const studentSelected = prevSelected[studentId] || [];
            if (studentSelected.includes(requestId)) {
                return {
                    ...prevSelected,
                    [studentId]: studentSelected.filter(id => id !== requestId)
                };
            } else {
                return {
                    ...prevSelected,
                    [studentId]: [...studentSelected, requestId]
                };
            }
        });
    };

    const handleCommonDescriptionChange = (e) => {
        const selectedDescription = e.target.value;
        setCommonDescription(selectedDescription);
        if (selectedDescription) {
            setDescription(selectedDescription);
        }
    };

    const filteredRequests = (requests) => requests.filter(request =>
        (requestTypeFilter ? request.requestTypeName === requestTypeFilter : true) &&
        (sourceFilter ? request.source === sourceFilter : true)
    );

    const handleViewRequest = (requestId) => {
        const request = Object.values(studentRequests).flat().find(req => req.requestId === requestId);
        Swal.fire({
            title: 'Detalles de la Solicitud',
            html: `<p><strong>Descripción:</strong> ${request.description}</p><p><strong>Fuente:</strong> ${request.source}</p>`,
            icon: 'info',
        });
    };

    const handleRemoveRequest = (studentId, requestId) => {
        setSelectedRequests(prevSelected => ({
            ...prevSelected,
            [studentId]: prevSelected[studentId].filter(id => id !== requestId)
        }));
    };

    const getShortDescription = (description, length = 10) => {
        return description.split(" ").slice(0, length).join(" ") + "...";
    };

    // Combine all selected requests from all students
    const allSelectedRequests = Object.entries(selectedRequests).flatMap(([id, requests]) =>
        requests.map(requestId => ({ studentId: id, ...studentRequests[id].find(req => req.requestId === requestId) }))
    );

    return (
        <div className='input-container'>
            <div className='text-button'>
                <h5 htmlFor='orderPapers'>Orden del Día:</h5>
                <button type="button" onClick={() => setModalIsOpen(true)}>
                    <FontAwesomeIcon icon={faCirclePlus} />
                </button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Agregar Orden del Día"
                className="custom-modal"
                overlayClassName="custom-overlay"
            >
                <button id='close-button' onClick={() => setModalIsOpen(false)}>X</button>
                <h2>Agregar Orden del Día</h2>
                <div>
                    <label htmlFor="studentId">ID de Estudiante</label>
                    <input
                        id="studentId"
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="Ingrese el ID del estudiante"
                    />
                    <button onClick={handleSearchStudentRequests}>Buscar</button>
                </div>
                <div>
                    <label htmlFor="commonDescription">Descripción Común</label>
                    <select
                        id="commonDescription"
                        value={commonDescription}
                        onChange={handleCommonDescriptionChange}
                    >
                        <option value="">Seleccione...</option>
                        <option value="Solicitudes estudiantiles">Solicitudes estudiantiles</option>
                        <option value="Varios">Varios</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="description">Descripción</label>
                    <input
                        id="description"
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Ingrese la descripción"
                    />
                </div>
                <div>
                    <label htmlFor="requestTypeFilter">Tipo de Solicitud</label>
                    <select
                        id="requestTypeFilter"
                        value={requestTypeFilter}
                        onChange={(e) => setRequestTypeFilter(e.target.value)}
                    >
                        <option value="">Todos</option>
                        {requestTypes.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="sourceFilter">Fuente</label>
                    <select
                        id="sourceFilter"
                        value={sourceFilter}
                        onChange={(e) => setSourceFilter(e.target.value)}
                    >
                        <option value="">Todas</option>
                        {sources.map(source => (
                            <option key={source} value={source}>{source}</option>
                        ))}
                    </select>
                </div>
                <h2>Solicitudes del Estudiante</h2>
                {studentRequests[studentId] ? (
                    <table>
                        <thead>
                            <tr>
                                <th>Tipo Solicitud</th>
                                <th>Descripción</th>
                                <th>Fuente</th>
                                <th>Seleccionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests(studentRequests[studentId]).map((request) => (
                                <tr key={request.requestId}>
                                    <td>{request.requestTypeName}</td>
                                    <td>
                                        <div dangerouslySetInnerHTML={{ __html: request.description }} />
                                    </td>
                                    <td>{request.source}</td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            value={request.requestId}
                                            checked={(selectedRequests[studentId] || []).includes(request.requestId)}
                                            onChange={() => handleRequestChange(studentId, request.requestId)}
                                            style={{ width: '20px', height: '20px' }}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No hay solicitudes para este estudiante</p>
                )}

                {/* Tabla para mostrar las solicitudes seleccionadas dentro del modal */}
                {allSelectedRequests.length > 0 && (
                    <div>
                        <h3>Solicitudes Seleccionadas</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>ID Estudiante</th>
                                    <th>Descripción Abreviada</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allSelectedRequests.map(({ studentId, requestId, description }) => (
                                    <tr key={requestId}>
                                        <td>{studentId}</td>
                                        <td dangerouslySetInnerHTML={{ __html: getShortDescription(description) }} />
                                        <td>
                                            <button onClick={() => handleViewRequest(requestId)}>
                                                <FontAwesomeIcon icon={faEye} /> Ver Completa
                                            </button>
                                            <button onClick={() => handleRemoveRequest(studentId, requestId)}>
                                                <FontAwesomeIcon icon={faTrash} /> Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className='center'>
                    <button onClick={handleAddOrderPaper}>Guardar</button>
                </div>
            </Modal>
        </div>
    );
};

export default OrderPaperComponent;
