import React, { useState, useEffect } from 'react';

const TableInputComponent = ({ onContentChange }) => {
    const [htmlContent, setHtmlContent] = useState('');

    const handlePaste = (event) => {
        event.preventDefault();
        const clipboardData = event.clipboardData;
        const html = clipboardData.getData('text/html');
        const plainText = clipboardData.getData('text/plain');

        if (html) {
            setHtmlContent(prevContent => prevContent + html);
        } else {
            setHtmlContent(prevContent => prevContent + `<p>${plainText}</p>`);
        }
    };

    const handleChange = (event) => {
        setHtmlContent(event.target.value);
    };

    useEffect(() => {
        onContentChange(htmlContent); // Envía el contenido HTML al padre
    }, [htmlContent, onContentChange]);

    return (
        <div style={{ padding: '20px' }}>
            <p>Descripción de la solicitud:</p>
            <div
                contentEditable
                onPaste={handlePaste}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
                onChange={handleChange}
                style={{
                    width: '100%',
                    minHeight: '200px',
                    maxHeight: '400px',
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: '#fff',
                    overflowY: 'auto',
                    whiteSpace: 'pre-wrap'
                }}
                placeholder="Copia y pega o escribe la solicitud aquí..."
            />
        </div>
    );
};

export default TableInputComponent;
