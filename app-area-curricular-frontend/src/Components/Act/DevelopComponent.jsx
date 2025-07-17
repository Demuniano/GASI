const DevelopComponent = () => {
    return (  
        <>
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
    </>
    );
}
 
export default DevelopComponent;