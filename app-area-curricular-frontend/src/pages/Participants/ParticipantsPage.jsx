import React, { useEffect, useState, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Modal from "react-modal";
import Swal from 'sweetalert2';
import AuthContext from '../../Components/Auth/AuthContext';

const ParticipantsPage = () => {
    const [participants, setParticipants] = useState([]);
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { auth } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        type: '',
        state: ''
    });

    const getParticipants = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/participant/getAllParticipants',{
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              });
            setParticipants(response.data);
        } catch (error) {
            console.error('Error fetching participants:', error);
        }
    };

    useEffect(() => {
        getParticipants();
    }, []);

    const handleEdit = (participant) => {
        setSelectedParticipant(participant);
        setFormData({
            name: participant.name,
            role: participant.role,
            type: participant.type,
            state: participant.state
        });
        setShowModal(true);
    };

    const handleCreate = () => {
        setSelectedParticipant(null);
        setFormData({
            name: '',
            role: '',
            type: '',
            state: ''
        });
        setShowModal(true);
    };

    const handleSave = async () => {
        // Validar que los campos no estén vacíos
        if (!formData.name || !formData.role || !formData.type || !formData.state) {
            Swal.fire({
                icon: 'warning',
                title: 'Campos incompletos',
                text: 'Por favor complete todos los campos antes de guardar.'
            });
            return;
        }

        try {
            if (selectedParticipant) {
                // Update existing participant
                await axios.put(`http://localhost:8080/api/participant/${selectedParticipant.id}`, formData,{
                    headers: {
                      Authorization: `Bearer ${auth.token}`
                    }
                  });
                setParticipants((prevParticipants) =>
                    prevParticipants.map((p) => (p.id === selectedParticipant.id ? { ...formData, id: selectedParticipant.id } : p))
                );
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Participante actualizado exitosamente'
                });
            } else {
                // Create new participant
                const response = await axios.post('http://localhost:8080/api/participant/newParticipant', formData,{
                    headers: {
                      Authorization: `Bearer ${auth.token}`
                    }
                  });
                setParticipants((prevParticipants) => [...prevParticipants, response.data]);
                Swal.fire({
                    icon: 'success',
                    title: 'Éxito',
                    text: 'Participante creado exitosamente'
                });
            }
            handleClose();
        } catch (error) {
            console.error('Error saving participant:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al guardar el participante'
            });
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedParticipant(null);
        setFormData({
            name: '',
            role: '',
            type: '',
            state: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const deleteParticipant = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/participant/${id}`,{
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              });
            setParticipants((prevParticipants) => prevParticipants.filter((p) => p.id !== id));
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: 'Participante eliminado exitosamente'
            });
        } catch (error) {
            console.error('Error deleting participant:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al eliminar el participante'
            });
        }
    };

    return (
        <div className="container mt-4">
            <h1>Comité asesor</h1>
            <div className="center">
                <button className="btn btn-success mb-3" onClick={handleCreate}>Nuevo Participante</button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Rol</th>
                        <th>Tipo</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {participants.map((participant) => (
                        <tr key={participant.id}>
                            <td>{participant.name}</td>
                            <td>{participant.role}</td>
                            <td>{participant.type}</td>
                            <td>{participant.state}</td>
                            <td>
                                <button className="btn btn-edit mr-2" onClick={() => handleEdit(participant)}>
                                <FontAwesomeIcon icon={faEdit} />Editar</button>
                                <button className="btn btn-delete ms-2" onClick={() => deleteParticipant(participant.id)}>
                                <FontAwesomeIcon icon={faTrash} /> Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={showModal}
                onRequestClose={handleClose}
                contentLabel="Editar Participante"
                className="custom-modal"
            >
                <h2>{selectedParticipant ? 'Editar Participante' : 'Nuevo Participante'}</h2>
                <form>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Rol</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Seleccione...</option>
                            <option value="Estudiante">Estudiante</option>
                            <option value="Profesor">Profesor</option>
                            <option value="Representante de egresados">Representante de Egresados</option>
                            <option value="Representante estudiantes">Representante de Estudiantes</option>
                            <option value="Representante profesores">Representante de Profesores</option>
                            <option value="Empresario">Empresario</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Tipo</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Seleccione...</option>
                            <option value="invitado">Invitado</option>
                            <option value="asistente">Asistente</option>
                            <option value="ausente">Ausente</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Estado</label>
                        <select
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Seleccione...</option>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                        </select>
                    </div>
                </form>
                <div className="center">
                    <button className="btn btn-primary" onClick={handleSave}>{selectedParticipant ? 'Guardar' : 'Crear'}</button>
                </div>
            </Modal>
        </div>
    );
}

export default ParticipantsPage;
