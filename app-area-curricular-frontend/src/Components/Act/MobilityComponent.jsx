import React, { useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import { useEffect } from 'react';

const MobilityModal = ({ isOpen, onRequestClose, onSubmit, editData }) => {
    const [formData, setFormData] = useState({
        targetEntity: '',
        country: '',
        purpose: '',
        result: '',
        type: '',
        outgoing: false,
        semester: '',
        startDate: '',
        endDate: '',
        lengthStay: ''
    });
    useEffect(() => {
        if (editData) {
            setFormData(editData);
            setSubjects(editData.subjects || []);
        }
    }, [editData]);
    const [subjects, setSubjects] = useState([]);
    const [newSubject, setNewSubject] = useState('');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : (name === 'lengthStay' ? parseInt(value, 10) : value)
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit({ ...formData, subjects });
            resetForm();
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, completa todos los campos obligatorios.',
            });
        }
    };

    const handleAddSubject = () => {
        if (newSubject.trim()) {
            setSubjects([...subjects, newSubject]);
            setNewSubject('');
        }
    };

    const handleNewSubjectChange = (e) => {
        setNewSubject(e.target.value);
    };

    const handleRemoveSubject = (index) => {
        setSubjects(subjects.filter((_, i) => i !== index));
    };
    const countries = [
        "Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", 
        "Arabia Saudita", "Argelia", "Argentina", "Armenia", "Australia", "Austria", 
        "Azerbaiyán", "Bahamas", "Bangladés", "Barbados", "Baréin", "Bélgica", 
        "Belice", "Benín", "Bielorrusia", "Birmania", "Bolivia", "Bosnia y Herzegovina", 
        "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso", "Burundi", 
        "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar", 
        "Chad", "Chile", "China", "Chipre", "Ciudad del Vaticano", "Colombia", 
        "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", 
        "Croacia", "Cuba", "Dinamarca", "Dominica", "Ecuador", "Egipto", 
        "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia", 
        "España", "Estados Unidos", "Estonia", "Etiopía", "Filipinas", "Finlandia", 
        "Fiyi", "Francia", "Gabón", "Gambia", "Georgia", "Ghana", "Granada", 
        "Grecia", "Guatemala", "Guyana", "Guinea", "Guinea-Bisáu", "Guinea Ecuatorial", 
        "Haití", "Honduras", "Hungría", "India", "Indonesia", "Irak", "Irán", 
        "Irlanda", "Islandia", "Islas Marshall", "Islas Salomón", "Israel", "Italia", 
        "Jamaica", "Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", 
        "Kiribati", "Kosovo", "Kuwait", "Laos", "Lesoto", "Letonia", "Líbano", 
        "Liberia", "Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Macedonia del Norte", 
        "Madagascar", "Malasia", "Malaui", "Maldivas", "Malí", "Malta", "Marruecos", 
        "Mauricio", "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco", 
        "Mongolia", "Montenegro", "Mozambique", "Namibia", "Nauru", "Nepal", 
        "Nicaragua", "Níger", "Nigeria", "Noruega", "Nueva Zelanda", "Omán", 
        "Países Bajos", "Pakistán", "Palaos", "Panamá", "Papúa Nueva Guinea", 
        "Paraguay", "Perú", "Polonia", "Portugal", "Reino Unido", "República Centroafricana", 
        "República Checa", "República del Congo", "República Democrática del Congo", 
        "República Dominicana", "Ruanda", "Rumania", "Rusia", "Samoa", 
        "San Cristóbal y Nieves", "San Marino", "San Vicente y las Granadinas", 
        "Santa Lucía", "Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles", 
        "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka", "Suazilandia", 
        "Sudáfrica", "Sudán", "Sudán del Sur", "Suecia", "Suiza", "Surinam", 
        "Tailandia", "Tanzania", "Tayikistán", "Timor Oriental", "Togo", "Tonga", 
        "Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", 
        "Ucrania", "Uganda", "Uruguay", "Uzbekistán", "Vanuatu", "Venezuela", 
        "Vietnam", "Yemen", "Yibuti", "Zambia", "Zimbabue"
    ];

    const resetForm = () => {
        setFormData({
            targetEntity: '',
            country: '',
            purpose: '',
            result: '',
            type: '',
            outgoing: false,
            semester: '',
            startDate: '',
            endDate: '',
            lengthStay: ''
        });
        setSubjects([]);
        setNewSubject('');
    };

    const handleClose = () => {
        resetForm();
        onRequestClose();
    };

    const validateForm = () => {
        const { targetEntity, country, purpose, result, type, semester, startDate, endDate, lengthStay } = formData;
        return targetEntity && country && purpose && result && type && semester && startDate && endDate && lengthStay;
    };

    return (
        <div className='input-container'>
            <Modal isOpen={isOpen} onRequestClose={handleClose} className="custom-modal" overlayClassName="custom-overlay">
                <button id='close-button' onClick={handleClose}>X</button>
                <h2>{editData ? "Editar Movilidad" : "Nueva Movilidad"}</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Entidad destino:
                        <input
                            type="text"
                            name="targetEntity"
                            className="form-control"
                            value={formData.targetEntity}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        País:
                        <select
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="form-control"
                        >
                            <option value="">Selecciona un país</option>
                            {countries.map((country) => (
                                <option key={country} value={country}>{country}</option>
                            ))}
                        </select>
                    </label>
                    <br />
                    <label>
                        Propósito:
                        <select
                            name="purpose"
                            value={formData.purpose}
                            onChange={handleChange}
                             className="form-control"
                        >
                            <option value="">Selecciona un propósito</option>
                            <option value="Intercambio">Intercambio</option>
                            <option value="Ponencia en congresos">Ponencia en congresos</option>
                            <option value="Estancia investigación">Estancia investigación</option>
                            <option value="Otro">Otro</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Resultado:
                        <input
                            type="text"
                            name="result"
                            className="form-control"
                            value={formData.result}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Tipo:
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                             className="form-control"
                        >
                            <option value="">Selecciona un tipo</option>
                            <option value="Presencial">Presencial</option>
                            <option value="Virtual">Virtual</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Movilidad saliente:
                        <select
                            name="outgoing"
                            value={formData.outgoing}
                            onChange={handleChange}
                             className="form-control"
                        >
                            <option value={false}>Nacional</option>
                            <option value={true}>Extranjero</option>
                        </select>
                    </label>
                    <br />
                    <label>
                        Periodo académico de movilidad:
                        <input
                            type="text"
                            name="semester"
                            className="form-control"
                            value={formData.semester}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Fecha inicio:
                        <input
                            type="date"
                            name="startDate"
                            className="form-control"
                            value={formData.startDate}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Fecha final:
                        <input
                            type="date"
                            name="endDate"
                            className="form-control"
                            value={formData.endDate}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <label>
                        Duración Tiempo Estadía (días):
                        <input
                            type="number"
                            name="lengthStay"
                            className="form-control"
                            value={formData.lengthStay}
                            onChange={handleChange}
                        />
                    </label>
                    <br />
                    <div className="subject-section">
                        <h4>Materias</h4>
                        <input
                            type="text"
                            value={newSubject}
                            onChange={handleNewSubjectChange}
                            placeholder="Nombre de la materia"
                        />
                        <button  id='btn-add-subjet' type="button" onClick={handleAddSubject}>Agregar Materia</button>
                        <ul>
                            {subjects.map((subject, index) => (
                                <li key={index}>
                                    <p className='delete-item mt-2' onClick={() => handleRemoveSubject(index)}>{subject}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='center'>
                        <button id='btn-submit-mobility' type="submit">Enviar</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default MobilityModal;
