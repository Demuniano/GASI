import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ActTable from './Components/Act/ActTable';
import './App.css';
import FormComponentC from './pages/Act/ActCreatePage';
import CategoryTableComponent from './Components/CategoryTableComponent';
import Modal from 'react-modal';
import StudentPage from './pages/Student/StudentPage';
import StudentDetailPage from './pages/Student/StudentDetailPage';
import ActEditPage from './pages/Act/ActEditPage';
import NavBarComponent from './Components/NavBar/NavBarComponent';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import ParticipantsPage from './pages/Participants/ParticipantsPage';
import UsersPage from './pages/Admin/UsersAdminPage';
import HomePage from './pages/Home/HomePage';
import Actview from './pages/Act/ActView';
import ActLayout from './utils/ActLayout';
import MultiStudentsRequestComponent from './Components/Student/MultiStudentsRequestComponent';
import { AuthProvider } from './Components/Auth/AuthContext'; 
import ProtectedRoute from './Components/Auth/ProtectedRoute';

function App() {
  Modal.setAppElement('#root');

  return (
    <AuthProvider> 
      <BrowserRouter>
        <NavBarComponent />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Rutas protegidas */}
          <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
          <Route path="/acts" element={<ProtectedRoute element={<ActTable />} />} />
          <Route path="/actview/:idAct" element={<ProtectedRoute element={<Actview />} />} />
          <Route path="/CreatePreAct" element={<ProtectedRoute element={<FormComponentC />} />} />
          <Route path="/createAct/:idAct" element={<ProtectedRoute element={<ActEditPage />} />} />
          <Route path="/studentPage" element={<ProtectedRoute element={<StudentPage />} />} />
          <Route path="/categoryTable" element={<ProtectedRoute element={<CategoryTableComponent />} />} />
          <Route path="/student/:id" element={<ProtectedRoute element={<StudentDetailPage />} />} />
          <Route path="/participants" element={<ProtectedRoute element={<ParticipantsPage />} />} />
          <Route path="/actLayout/:idAct" element={<ProtectedRoute element={<ActLayout />} />} />  
          <Route path="/multiStudentsRequest" element={<ProtectedRoute element={<MultiStudentsRequestComponent />} />} />
          <Route path="/users" element={<ProtectedRoute element={<UsersPage />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
