import React, { useState } from 'react';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import RichTextEditor from '../Student/RichTextEditor';

const RecommendationComponent = ({ isOpen, onClose, onSave }) => {
    const [recommendation, setRecommendation] = useState('');
    const [status, setStatus] = useState('');

    const handleSave = () => {
        if (!recommendation || !status) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar una recomendación y seleccionar un estado.',
            });
            return;
        }

        onSave([recommendation, status]);
        setRecommendation('');
        setStatus('');
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: 'Recomendación guardada exitosamente.',
        });
        onClose();
    };

    const handleApprovedChange = () => {
        setStatus(status === 'Aprobada' ? '' : 'Aprobada');
    };

    const handleDeniedChange = () => {
        setStatus(status === 'Denegada' ? '' : 'Denegada');
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Agregar Recomendación"
            className="custom-modal"
            overlayClassName="custom-overlay"
        >
            <div className='container'>
                <button id='close-button' onClick={onClose}>X</button>
                <h2>Recomendación</h2>
                <div className='center mt-4'>
                    <RichTextEditor onContentChange={setRecommendation} />
                </div>
                <div className='center'>
                    <label>
                        <input
                            type="checkbox"
                            checked={status === 'Aprobada'}
                            onChange={handleApprovedChange}
                        />
                        Aprobada
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={status === 'Denegada'}
                            onChange={handleDeniedChange}
                        />
                        Denegada
                    </label>
                </div>
                <div className='center'>
                    <button onClick={handleSave}>Guardar</button>
                </div>
            </div>
        </Modal>
    );
};

export default RecommendationComponent;
