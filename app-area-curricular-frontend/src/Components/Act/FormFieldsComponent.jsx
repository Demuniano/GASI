import React from 'react';

const FormFieldsComponent = ({ formData, handleChange }) => (
    <>
        <div className="input-container">
            <label htmlFor="name">Número de acta:</label>
            <input
                type="number"
                className="form-control"
                id="actId"
                name="actId"
                value={formData.actId}
                onChange={handleChange}
                min={1}
            />
        </div>
        <div className="input-container">
            <label htmlFor="date">Fecha:</label>
            <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
            />
        </div>
        <div className="input-container">
            <label htmlFor="place">Lugar:</label>
            <input
                type="text"
                className="form-control"
                id="place"
                name="place"
                value={formData.place}
                onChange={handleChange}
            />
        </div>
        <div className="input-container">
            <label htmlFor="time">Hora:</label>
            <input
                type="text"
                className="form-control"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
            />
        </div>
    </>
);

export default FormFieldsComponent;
