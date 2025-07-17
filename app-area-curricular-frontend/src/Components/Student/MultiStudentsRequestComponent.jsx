import React, { useEffect, useState, useContext} from 'react';
import axios from 'axios';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../Auth/AuthContext';
import '../../../src/sass/Act/RequestModal.scss';
import RichTextEditor from './RichTextEditor';

const MultiStudentsRequestComponent = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedRequestType, setSelectedRequestType] = useState(null);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [requestTypeOptions, setRequestTypeOptions] = useState([]);
    const [description, setDescription] = useState('');
    const [selectedMotivo, setSelectedMotivo] = useState(null);
    const [requestDate, setRequestDate] = useState('');
    const [selectedSource, setSelectedSource] = useState(null);
    const [studentIds, setStudentIds] = useState([]);
    const [dniColumnIndex, setDniColumnIndex] = useState(0); // Default to first column
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
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
            const formattedDate = requestDate ? new Date(requestDate).toISOString().split('T')[0] : null;

            await Promise.all(studentIds.map(async (id) => {
                const requestBody = {
                    description: description
                };

                // Corrected headers for the first POST request
                const contentResponse = await axios.post('http://localhost:8080/api/contentRequest/newContentRequest', requestBody, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.token}`
                    }
                });
                const requestRequestBody = {
                    reason: selectedMotivo?.value,
                    source: selectedSource?.value,
                    dateRequest: formattedDate,
                };

                // Corrected headers for the second POST request
                await axios.post(`http://localhost:8080/api/request/newRequest/${selectedRequestType.value}/${id}/${contentResponse.data.idContentRequest}`, requestRequestBody,{
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${auth.token}`
                    }
                });
            }));

            Swal.fire({
                icon: 'success',
                title: 'Solicitud Creada',
                text: `Se ha creado una nueva solicitud (${selectedRequestType.label}) para los estudiantes seleccionados.`
            });
            navigate('/');
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
        extractStudentIds(content);
    };

    const extractStudentIds = (content) => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const table = doc.querySelector('table');

        if (!table) {
            setStudentIds([]);
            return;
        }

        const rows = table.querySelectorAll('tr');
        const ids = Array.from(rows).map(row => {
            const cells = row.querySelectorAll('td, th');
            const dni = cells[dniColumnIndex] ? cells[dniColumnIndex].textContent.trim() : null;
            return dni && /^\d+$/.test(dni) ? dni : null; // Check if DNI is numeric
        }).filter(id => id);

        setStudentIds(ids);
    };

    return (
        <div className="acta-container">
            <h2 className='mb-4'>Nueva Solicitud</h2>
            <p>Índice de la columna DNI:</p>
            <input
                type="number"
                value={dniColumnIndex}
                onChange={(e) => setDniColumnIndex(Number(e.target.value))}
                min="0"
                style={{ width: '100%', padding: '10px', borderRadius: '4px', marginBottom: '10px' }}
            />
            <p>IDs extraídos:</p>
            <ul>
                {studentIds.map((id, index) => (
                    <li key={index}>{id}</li>
                ))}
            </ul>
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
            <div className='mt-4'>
                <p>Descripción de la solicitud:</p>
                <RichTextEditor onContentChange={handleContentChange} />
            </div>
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
        </div>
    );
};

export default MultiStudentsRequestComponent;
