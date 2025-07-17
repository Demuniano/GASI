import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import Select from 'react-select';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import '../../../src/sass/Act/RequestModal.scss';
import AuthContext from '../Auth/AuthContext';
// import TableInputComponent from './TableInputComponent';
import RichTextEditor from './RichTextEditor';

const StudentRequestComponent = ({ studentId, onClose, isOpen }) => {
    const [student, setStudent] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedRequestType, setSelectedRequestType] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [requestTypeOptions, setRequestTypeOptions] = useState([]);
    const [description, setDescription] = useState('');
    const [selectedMotivo, setSelectedMotivo] = useState(null);
    const [requestDate, setRequestDate] = useState('');
    const [selectedSource, setSelectedSource] = useState(null);
    const { auth } = useContext(AuthContext);

    const motivoOptions = [
        { value: 'no_aplica', label: 'No Aplica' },
        { value: 'economico', label: 'Económico' },
        { value: 'trabajo', label: 'Trabajo' },
        // Agrega más opciones según sea necesario
    ];
    const sourceOptions = [
        { value: 'manual', label: 'Manual' },
        { value: 'sia', label: 'SIA' }
    ];

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/category/getAllRequestCategorys', {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                const options = response.data.map((category) => ({
                    value: category.idRequestCategory,
                    label: category.name
                }));
                setCategoryOptions(options);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, [auth]);

    useEffect(() => {
        if (selectedCategory) {
            const fetchRequestTypes = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/api/category/${selectedCategory.value}`, {
                        headers: {
                            Authorization: `Bearer ${auth.token}`
                        }
                    });
                    const options = response.data.requestTypes.map((type) => ({
                        value: type.idRequestType,
                        label: type.name
                    }));
                    setRequestTypeOptions(options);
                } catch (error) {
                    console.error('Error fetching request types:', error);
                }
            };

            fetchRequestTypes();
        }
    }, [selectedCategory, auth]);

    const handleCreateRequest = async () => {
        if (!selectedRequestType) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor selecciona un tipo de solicitud.'
            });
            return;
        }
        try {
            const requestBody = {
                description: description
            };
            const response = await axios.post('http://localhost:8080/api/contentRequest/newContentRequest', requestBody, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            const formattedDate = requestDate ? new Date(requestDate).toISOString().split('T')[0] : null;
            const requestRequestBody = {
                reason: selectedMotivo?.value,
                source: selectedSource?.value,
                dateRequest: formattedDate,
            };

            await axios.post(`http://localhost:8080/api/request/newRequest/${selectedRequestType.value}/${studentId}/${response.data.idContentRequest}`, requestRequestBody, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            Swal.fire({
                icon: 'success',
                title: 'Solicitud Creada',
                text: `Se ha creado una nueva solicitud (${selectedRequestType.label}) para ${student?.name}.`
            });
            onClose(); // Cerrar el modal
        } catch (error) {
            console.error('Error creating request:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Hubo un problema al crear la solicitud.'
            });
        }
    };

    const handleContentChange = (content) => {
        setDescription(content);
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="custom-modal"
            contentLabel="Nueva Solicitud"
            appElement={document.getElementById('root')}
        >
            <button className="close-button" onClick={onClose}>X</button>
            <h2 className='mb-4'>Nueva Solicitud</h2>
            <p>Selecciona una categoría para la solicitud:</p>
            <Select
                options={categoryOptions}
                value={selectedCategory}
                onChange={(selectedOption) => setSelectedCategory(selectedOption)}
                placeholder="Selecciona una categoría..."
                isSearchable
            />
            {selectedCategory && (
                <>
                    <p>Selecciona un tipo de solicitud:</p>
                    <Select
                        options={requestTypeOptions}
                        value={selectedRequestType}
                        onChange={(selectedOption) => setSelectedRequestType(selectedOption)}
                        placeholder="Selecciona un tipo de solicitud..."
                        isSearchable
                    />
                </>
            )}
            <p className='mt-4'>Motivo de la solicitud:</p>
            <Select
                options={motivoOptions}
                value={selectedMotivo}
                onChange={(selectedOption) => setSelectedMotivo(selectedOption)}
                placeholder="Selecciona un motivo..."
                isSearchable
            />
            <p className='mt-4'>Fuente de la solicitud:</p>
            <Select
                options={sourceOptions}
                value={selectedSource}
                onChange={(selectedOption) => setSelectedSource(selectedOption)}
                placeholder="Selecciona una fuente..."
                isSearchable
            />
            {/* <TableInputComponent onContentChange={setDescription} /> */}
            <div className='mt-4'>
                <p>Descripción de la solicitud:</p>
                <RichTextEditor onContentChange={handleContentChange}/>
            </div>
            {/* <div>
                <h2>Contenido del Editor:</h2>
                <div dangerouslySetInnerHTML={{ __html: description }} />
            </div> */}
            <p className='mt-4'>Selecciona una fecha:</p>
            <input
                type="date"
                value={requestDate}
                onChange={(e) => setRequestDate(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}
            />
            <div className='center'>
                <button id='BtnSolicitud' onClick={handleCreateRequest}>Crear Solicitud</button>
            </div>
        </Modal>
    );
};

export default StudentRequestComponent;
