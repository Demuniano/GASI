import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../sass/Home/HomePage.scss";

const HomePage = () => {
  return (
    <>
    <div className="home-container">
      <h1 className="mt-4 mb-4">Sistema GASI</h1>
      <div className="card-container">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Nueva Acta</h5>
            <p className="card-text">Crea una nueva acta de reunión.</p>
            <Link to="/CreatePreAct" className="btn btn-primary">
              Crear Acta
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Ver Actas</h5>
            <p className="card-text">Revisa las actas existentes.</p>
            <Link to="/acts" className="btn btn-primary">
              Ver Actas
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Ver Estudiantes</h5>
            <p className="card-text">Revisa los estudiantes y sus solicitudes.</p>
            <Link to="/studentPage" className="btn btn-primary">
              Ver Estudiantes
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div className="home-container home-endPage">
      <div className="card-container">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Nueva Solicitud múltiple</h5>
            <p className="card-text">Crea una nueva solicitud para varios estudiantes.</p>
            <Link to="/multiStudentsRequest" className="btn btn-primary">
              Crear Solicitud
            </Link>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Ver Categorias</h5>
            <p className="card-text">Revisa las categorias de las solicitudes.</p>
            <Link to="/categoryTable" className="btn btn-primary">
              Ver Categorias
            </Link>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default HomePage;
