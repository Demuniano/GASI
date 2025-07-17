import React, { useState, useContext } from 'react';
import AuthContext from '../../Components/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../sass/Auth/AuthForm.scss';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, password);
      navigate('/'); // Redirigir al inicio después de un registro exitoso
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="authForm-container">
      <h2 className="register-title">Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="register-form-group">
          <label className="authFom-label">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="authForm-input"
          />
        </div>
        <div className="register-form-group">
          <label className="authFom-label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="authForm-input"
          />
        </div>
        <button type="submit" className="authForm-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
