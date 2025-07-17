import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StudentListComponent = ({ students }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 50; // Número de estudiantes por página
    const navigate = useNavigate();

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Resetear a la primera página al buscar
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.idStudent.toString().includes(searchTerm)
    );

    // Obtener los estudiantes actuales
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    const currentStudents = filteredStudents.slice(indexOfFirstStudent, indexOfLastStudent);

    // Cambiar página
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleViewDetails = (id) => {
        navigate(`/student/${id}`);
    };

    return (
        <div>
            <h2>Lista de Estudiantes</h2>
            <input
                type="text"
                placeholder="Buscar por nombre o ID"
                value={searchTerm}
                onChange={handleSearch}
                style={{ marginBottom: '10px', padding: '10px', borderRadius: '4px', width: '100%' }}
            />
            <table style={{ width: '100%', borderCollapse: 'collapse' }} className='table table-striped'>
                <thead className='thead-dark'>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentStudents.map(student => (
                        <tr key={student.idStudent}>
                            <td>{student.idStudent}</td>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>
                                <button className='btn btn-primary' onClick={() => handleViewDetails(student.idStudent)}>
                                    Ver Detalles
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: Math.ceil(filteredStudents.length / studentsPerPage) }, (_, index) => (
                    <button
                        key={index}
                        className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
                        onClick={() => paginate(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default StudentListComponent;
