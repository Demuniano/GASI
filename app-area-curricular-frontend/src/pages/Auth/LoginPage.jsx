import React, { useState, useContext } from 'react';
import AuthContext from '../../Components/Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../../sass/Auth/AuthForm.scss';
import gasiSVG from '../../assets/gasiBlack.svg';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);

      navigate('/');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="authForm-container">
      <div className='center'>
        <img src={gasiSVG} alt="Gasi" className="authForm-logo img-fluid" />
      </div>
      <h2 className="register-title">Inciar sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="register-form-group">
          <label className='authFom-label'>Usuario</label>
          <input
            data-cy="login-username"
            className="authForm-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="register-form-group">
          <label className='authFom-label'>Contraseña</label>
          <input
            data-cy="login-password"
            className="authForm-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="authForm-button" type="submit" data-cy="login-submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
