import React from 'react';
import { useNavigate } from 'react-router-dom'; // Cambiado de useHistory a useNavigate

const Home = () => {
  const navigate = useNavigate(); // Hook actualizado

  // Función para redirigir al login
  const handleLogin = () => {
    navigate('/login');  // Usando navigate para redirigir
  };

  // Función para redirigir al dashboard
  const handleDashboard = () => {
    navigate('/dashboard');  // Usando navigate para redirigir
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Bienvenido a nuestra tienda</h1>
      <p style={styles.paragraph}>Explora nuestros productos y más</p>
      
      <div style={styles.buttonContainer}>
        <button onClick={handleLogin} style={styles.button}>
          Iniciar Sesión
        </button>
        <button onClick={handleDashboard} style={styles.button}>
          Ir al Dashboard
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '20px',
  },
  paragraph: {
    fontSize: '1.2rem',
    marginBottom: '30px',
  },
  buttonContainer: {
    display: 'flex',
    gap: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Home;
