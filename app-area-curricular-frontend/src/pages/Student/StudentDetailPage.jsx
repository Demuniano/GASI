import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import '../../sass/Student/StudentDetailPage.scss';
import StudentRequestComponent from '../../Components/Student/StudentRequestComponent';
import { useParams } from 'react-router-dom';
import Modal from 'react-modal';
import AuthContext from '../../Components/Auth/AuthContext';

const StudentDetailPage = () => {
    const [student, setStudent] = useState(null);
    const { auth } = useContext(AuthContext);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const { id } = useParams();
    const [showDetailComponent, setShowDetailComponent] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // Estados para la paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [requestsPerPage] = useState(10); // Número de solicitudes por página

    const fetchStudentDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/api/student/${id}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setStudent(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching student details:', error);
        }
    };

    useEffect(() => {
        fetchStudentDetails();
    }, [id]);

    if (!student) {
        return <div>Loading...</div>;
    }

    // Ordenar las solicitudes por fecha (más recientes primero)
    const sortedRequests = student.requests.slice().sort((a, b) => new Date(b.dateRequest) - new Date(a.dateRequest));

    // Obtener las solicitudes actuales
    const indexOfLastRequest = currentPage * requestsPerPage;
    const indexOfFirstRequest = indexOfLastRequest - requestsPerPage;
    const currentRequests = sortedRequests.slice(indexOfFirstRequest, indexOfLastRequest);

    // Cambiar página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Manejar la apertura y cierre del modal
    const handleShowModal = (request) => {
        setSelectedRequest(request);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedRequest(null);
    };

    // Manejar el cierre del componente `StudentRequestComponent` y refrescar los datos
    const handleCloseRequestComponent = () => {
        setShowDetailComponent(false);
        fetchStudentDetails(); // Refresca los datos al cerrar el componente
    };

    // Calcular el número total de páginas
    const totalPages = Math.ceil(sortedRequests.length / requestsPerPage);

    return (
        <div className="detail-student mt-4">
            <h2 className='mb-4 mt-2'>{student.name}</h2>
            <p><strong>Código:</strong> {student.idStudent}</p>
            <p><strong>Correo:</strong> {student.email}</p>
            <p><strong>Solicitudes:</strong></p>
            <table className="table">
                <thead>
                    <tr>
                        <th>Fecha de Solicitud</th>
                        <th>Estado</th>
                        <th>Motivo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentRequests.map((request) => (
                        <tr key={request.idRequest}>
                            <td>{request.dateRequest}</td>
                            <td>{request.state}</td>
                            <td>{request.reason}</td>
                            <td>
                                <button className="btn btn-info" onClick={() => handleShowModal(request)}>Ver más</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='center'>
                <button className="btn btn-primary" onClick={() => setShowDetailComponent(true)}>Nueva solicitud</button>
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <Modal
                isOpen={showModal}
                onRequestClose={handleCloseModal}
                contentLabel="Detalle de la Solicitud"
                className="custom-modal"
            >
                <h2>Detalle de la Solicitud</h2>
                {selectedRequest && (
                    <div>
                        <p><strong>Estado:</strong> {selectedRequest.state}</p>
                        <p><strong>Razón:</strong> {selectedRequest.reason}</p>
                        <p><strong>Fecha de Solicitud:</strong> {selectedRequest.dateRequest}</p>
                        <div dangerouslySetInnerHTML={{ __html: selectedRequest.contentRequest.description }}></div>
                    </div>
                )}
                <button className="btn btn-secondary" onClick={handleCloseModal}>Cerrar</button>
            </Modal>
            {showDetailComponent && <StudentRequestComponent studentId={id} onClose={handleCloseRequestComponent} isOpen={true} />}
        </div>
    );
};

export default StudentDetailPage;
