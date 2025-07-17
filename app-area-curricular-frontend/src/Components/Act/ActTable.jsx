import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../src/sass/Act/ActTable.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faEdit, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import AuthContext from '../Auth/AuthContext';
import Swal from "sweetalert2"; // Importa SweetAlert2

const ActTable = () => {
  const url = "http://localhost:8080/api/act/getAllActs";
  const [acts, setActs] = useState([]);
  const [filteredActs, setFilteredActs] = useState([]);
  const [actIdToDelete, setActIdToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [actsPerPage] = useState(10); // Número de actas por página
  const [searchCode, setSearchCode] = useState(""); // Estado para el código de búsqueda
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    getActs();
  }, []);

  const handleClick = () => {
    navigate('/CreatePreAct');
  };
  const handleEdit = (idAct) => {
    navigate(`/createAct/${idAct}`);
  };
  const handleView = (idAct) => {
    navigate(`/actLayout/${idAct}`);
  };

  const getActs = async () => {
    try {
      const response = await axios.get(url,{
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      const fetchedActs = response.data;
      await getActsCompleted(fetchedActs);
    } catch (error) {
      console.error("Error fetching acts:", error);
    }
  };

  const handleDelete = async (idToDelete) => {
    console.log("Eliminando acta con ID:", idToDelete);
    try {
      await axios.delete(`http://localhost:8080/api/mobility/deleteByActId/${idToDelete}`,{
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      await axios.delete(`http://localhost:8080/api/act/${idToDelete}`,{
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      getActs();
      Swal.fire("¡Eliminado!", "El acta ha sido eliminada correctamente.", "success");
    } catch (error) {
      console.error("Error deleting act:", error);
      Swal.fire("Error", "Ha ocurrido un error al eliminar el acta.", "error");
    }
  };

  const openModal = (actId) => {
    console.log("Abriendo modal para eliminar acta con ID:", actId);
    setActIdToDelete(actId);
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(actId);
      }
    });
  };

  // Obtener las actas actuales
  const indexOfLastAct = currentPage * actsPerPage;
  const indexOfFirstAct = indexOfLastAct - actsPerPage;
  const currentActs = filteredActs.slice(indexOfFirstAct, indexOfLastAct);

  // Cambiar página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Manejar la búsqueda por código
  const handleSearch = (event) => {
    const searchValue = event.target.value;
    setSearchCode(searchValue);
    const filtered = acts.filter(act => act.actId.toString().includes(searchValue));
    setFilteredActs(filtered);
    setCurrentPage(1); // Reiniciar a la primera página en cada búsqueda
  };

  const actRequestStates = async (idAct) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/act/${idAct}/requestStates`,{
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching act request states:", error);
      return [];
    }
  };

  const getActsCompleted = async (acts) => {
    const updatedActs = await Promise.all(
      acts.map(async (act) => {
        const requestStates = await actRequestStates(act.actId);
        const completed = requestStates.every((request) => request.state !== "Pendiente");
        return {
          ...act,
          completed: completed
        };
      })
    );

    setActs(updatedActs);
    setFilteredActs(updatedActs);
  };

  return (
    <div className="container mt-4 mb-4">
      <h1>Actas</h1>
      <div className="add-act-button mb-3 center">
        <button className="btn btn-primary" onClick={handleClick}>
          <FontAwesomeIcon icon={faCirclePlus} /> Nueva PreActa
        </button>
      </div>
      <div className="search-bar mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Buscar por código de acta"
          value={searchCode}
          onChange={handleSearch}
        />
      </div>
      <div className="table-container">
        <table className="meeting-table">
            <thead className="table-header">
                <tr>
                    <th>Código</th>
                    <th>Fecha</th>
                    <th>Lugar</th>
                    <th>Orden del día</th>
                    <th>Opciones</th>
                </tr>
            </thead>
            <tbody>
                {currentActs.map((act) => (
                    <tr key={act.actId}>
                        <td>{act.actId}</td>
                        <td>{act.date}</td>
                        <td>{act.place}</td>
                        <td>
                            <ul>
                                {act.orderPapers.map((orderPaper) => (
                                    <li key={orderPaper.id} className="highlighted">
                                        {orderPaper.description}
                                    </li>
                                ))}
                            </ul>
                        </td>
                        <td>
                            {act.completed ? (
                              <>
                                <button className="btn btn-view" onClick={() => handleView(act.actId)}>
                                  <FontAwesomeIcon icon={faEye}/> Ver Acta      
                                </button>
                              </>
                            ) : (
                              <button className="btn btn-edit mr-2" onClick={() => handleEdit(act.actId)}>
                                    <FontAwesomeIcon icon={faEdit} /> Acta
                                </button>
                            )}
                            <button className="btn btn-delete" onClick={() => openModal(act.actId)}>
                                <FontAwesomeIcon icon={faTrash} /> Eliminar
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
      </div>
      {console.log(acts,"acts")}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredActs.length / actsPerPage) }, (_, index) => (
          <button
            key={index}
            className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActTable;
