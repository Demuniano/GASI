import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Swal from 'sweetalert2'; // Importar SweetAlert2
import AuthContext from '../../Components/Auth/AuthContext';

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { auth } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        role: ''
    });

    const getUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/user/allUsers', {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    const handleSave = async () => {
        try {
            if (selectedUser) {
                await axios.put(`http://localhost:8080/api/users/${selectedUser.id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario actualizado',
                    text: 'Los datos del usuario han sido actualizados correctamente.',
                    confirmButtonColor: '#3085d6',
                });
            } else {
                const response = await axios.post('http://localhost:8080/auth/register', formData, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario creado',
                    text: 'El usuario ha sido registrado correctamente.',
                    confirmButtonColor: '#3085d6',
                });
            }
            getUsers(); // Actualiza la lista de usuarios
            handleClose();
        } catch (error) {
            console.error('Error saving user:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al guardar el usuario.',
                confirmButtonColor: '#d33',
            });
        }
    };

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esto!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'Cancelar'
        });

        if (result.isConfirmed) {
            try {
                await axios.delete(`http://localhost:8080/api/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                setUsers((prevUsers) => prevUsers.filter((u) => u.id !== id));
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario eliminado',
                    text: 'El usuario ha sido eliminado correctamente.',
                    confirmButtonColor: '#3085d6',
                });
            } catch (error) {
                console.error('Error deleting user:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Hubo un problema al eliminar el usuario.',
                    confirmButtonColor: '#d33',
                });
            }
        }
    };

    const handleClose = () => {
        setShowModal(false);
        setSelectedUser(null);
        setFormData({
            firstname: '',
            lastname: '',
            username: '',
            password: '',
            role: ''
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    return (
        <div className="container mt-4">
            <h1>Usuarios</h1>
            <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>Crear Usuario</button>
            <table className="table">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Nombre de Usuario</th>
                        <th>Rol</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.firstname}</td>
                            <td>{user.lastname}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                isOpen={showModal}
                onRequestClose={handleClose}
                contentLabel="Editar Usuario"
                className="custom-modal"
            >
                <h2>{selectedUser ? 'Editar Usuario' : 'Crear Usuario'}</h2>
                <form>
                    <div className="form-group">
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Apellido</label>
                        <input
                            type="text"
                            name="lastname"
                            value={formData.lastname}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Nombre de Usuario</label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Contraseña</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="form-control"
                        />
                    </div>
                    {/* <div className="form-group">
                        <label>Rol</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Seleccione...</option>
                            <option value="ROLE_USER">Usuario</option>
                            <option value="ROLE_ADMIN">Administrador</option>
                        </select>
                    </div> */}
                </form>
                <button className="btn btn-secondary" onClick={handleClose}>Cancelar</button>
                <button className="btn btn-primary ms-4" onClick={handleSave}>{selectedUser ? 'Guardar' : 'Crear'}</button>
            </Modal>
        </div>
    );
}

export default UsersPage;
