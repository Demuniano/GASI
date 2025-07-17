import React, { createContext, useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role'); // Obtener el rol desde localStorage
    const expiration = localStorage.getItem('tokenExpiration');

    if (token && expiration && new Date().getTime() < expiration) {
      return { token, role }; // Retornar tanto el token como el rol
    }
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Eliminar el rol si el token ha expirado
    localStorage.removeItem('tokenExpiration');
    return null;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const expiration = localStorage.getItem('tokenExpiration');
      if (expiration && new Date().getTime() >= expiration) {
        logout();
      }
    }, 1000 * 60); // Verificar cada minuto

    return () => clearInterval(interval);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (data.token) {
        const expirationTime = new Date().getTime() + 1000 * 60 * 60 * 4; // 4 horas
        setAuth({ token: data.token, role: data.role }); // Guardar el token y el rol en el estado
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.role); // Guardar el rol en localStorage
        localStorage.setItem('tokenExpiration', expirationTime);
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          text: '¡Bienvenido de nuevo!',
          confirmButtonColor: '#3085d6',
        });
      } else {
        console.log('no token');
      }
    } catch (error) {
      console.error('Error during login:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al iniciar sesión',
        text: 'Nombre de usuario o contraseña incorrectos',
        confirmButtonColor: '#d33',
      });
    }
  };

  const register = async (username, password) => {
    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      const expirationTime = new Date().getTime() + 1000 * 60 * 60 * 4; // 4 horas
      setAuth({ token: data.token, role: data.role }); // Guardar el token y el rol en el estado
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role); // Guardar el rol en localStorage
      localStorage.setItem('tokenExpiration', expirationTime);
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Eliminar el rol al cerrar sesión
    localStorage.removeItem('tokenExpiration');
  };

  return (
    <AuthContext.Provider value={{ auth, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
