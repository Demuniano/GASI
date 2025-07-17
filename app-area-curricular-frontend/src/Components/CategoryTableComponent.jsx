import React, { useEffect, useState,useContext} from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button, Form } from "react-bootstrap"; 
import Swal from "sweetalert2";
import AuthContext from '../Components/Auth/AuthContext';

const CategoryTableComponent = () => {
    const url = "http://localhost:8080/api/category/getAllRequestCategorys";
    const [categorys, setCategorys] = useState([]);
    const [showCategoryModal, setShowCategoryModal] = useState(false);
    const [showRequestTypeModal, setShowRequestTypeModal] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newRequestTypeName, setNewRequestTypeName] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const { auth } = useContext(AuthContext);
    const fetchCategorys = async () => {
        try {
            const response = await axios.get(url,{
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              });
            setCategorys(response.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategorys();
    }, []);

    const handleCategoryModalOpen = () => setShowCategoryModal(true);
    const handleCategoryModalClose = () => setShowCategoryModal(false);
    const handleRequestTypeModalOpen = (categoryId) => {
        setSelectedCategoryId(categoryId);
        setShowRequestTypeModal(true);
    };
    const handleRequestTypeModalClose = () => setShowRequestTypeModal(false);

    const handleCreateCategory = async () => {
        if (!newCategoryName.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Campo vacío',
                text: 'El nombre de la categoría no puede estar vacío.',
            });
            return;
        }

        try {
            await axios.post('http://localhost:8080/api/category/newRequestCategory', { name: newCategoryName },{
                headers: {
                  Authorization: `Bearer ${auth.token}`
                }
              });
            fetchCategorys();
            setNewCategoryName("");
            handleCategoryModalClose();
            Swal.fire({
                icon: 'success',
                title: 'Categoría creada',
                text: 'La categoría ha sido creada exitosamente.',
            });
        } catch (error) {
            console.error("Error creating category:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al crear la categoría.',
            });
        }
    };

    const handleCreateRequestType = async () => {
        if (!selectedCategoryId) return;

        if (!newRequestTypeName.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Campo vacío',
                text: 'El nombre del tipo de solicitud no puede estar vacío.',
            });
            return;
        }

        try {
            await axios.post(
                `http://localhost:8080/api/requestType/newRequestType/${selectedCategoryId}`, 
                { name: newRequestTypeName },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${auth.token}` // Asegúrate de reemplazar 'auth' con tu token de autenticación
                    }
                }
            );
            fetchCategorys();
            setNewRequestTypeName("");
            handleRequestTypeModalClose();
            Swal.fire({
                icon: 'success',
                title: 'Tipo de solicitud creado',
                text: 'El tipo de solicitud ha sido creado exitosamente.',
            });
        } catch (error) {
            console.error("Error creating request type:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un error al crear el tipo de solicitud.',
            });
        }
    };

    return (
        <div className="container mt-4">
            <h1>Categoria de solicitudes</h1>
            <div className="add-act-button mb-3">
                <button className="btn btn-primary" onClick={handleCategoryModalOpen}>
                    <FontAwesomeIcon icon={faCirclePlus} /> Agregar Categoria
                </button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Nombre</th>
                            <th>Tipo de solicitud</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorys.map((category) => (
                            <tr key={category.idRequestCategory}>
                                <td>{category.name}</td>
                                <td>
                                    <ul>
                                        {category.requestTypes.map((requestType) => (
                                            <li key={requestType.idRequestType}>{requestType.name}</li>
                                        ))}
                                    </ul>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => handleRequestTypeModalOpen(category.idRequestCategory)}
                                    >
                                        Agregar Tipo de Solicitud
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal para Crear Categoria */}
            <Modal show={showCategoryModal} onHide={handleCategoryModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Categoria</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formCategoryName">
                            <Form.Label>Nombre de la Categoria</Form.Label>
                            <Form.Control
                                type="text"
                                value={newCategoryName}
                                onChange={(e) => setNewCategoryName(e.target.value)}
                                placeholder="Ingrese el nombre de la categoría"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCategoryModalClose}>
                        Cerrar
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleCreateCategory}
                        disabled={!newCategoryName.trim()}
                    >
                        Crear Categoria
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal para Crear Tipo de Solicitud */}
            <Modal show={showRequestTypeModal} onHide={handleRequestTypeModalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Agregar Tipo de Solicitud</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formRequestTypeName">
                            <Form.Label>Nombre del Tipo de Solicitud</Form.Label>
                            <Form.Control
                                type="text"
                                value={newRequestTypeName}
                                onChange={(e) => setNewRequestTypeName(e.target.value)}
                                placeholder="Ingrese el nombre del tipo de solicitud"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleRequestTypeModalClose}>
                        Cerrar
                    </Button>
                    <Button 
                        variant="primary" 
                        onClick={handleCreateRequestType}
                        disabled={!newRequestTypeName.trim()}
                    >
                        Crear Tipo de Solicitud
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default CategoryTableComponent;
