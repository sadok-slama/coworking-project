import React, { useState } from 'react';
import api, { setAuthToken } from '../services/api';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();
  e.stopPropagation();
  
  if (isSubmitting) return;
  
  setError('');
  setIsSubmitting(true);
  
  try {
    const res = await api.post('/login', { email, password });
    const token = res.data.token;
    localStorage.setItem('token', token);
    setAuthToken(token);
    navigate('/dashboard');
  } catch (err) {
    if (err.response?.status === 401) {
      setError('Email ou mot de passe invalide');
    } else {
      setError('Une erreur est survenue');
    }
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0px',
      margin: 0,
      overflowX: 'hidden',
      position: 'relative'
    }}>
      <div style={{
        width: '100vw',
        minHeight: '80vh',
        backgroundColor: 'rgba(255, 255, 255, 0.29)',
        borderRadius: '20px',
        display: 'flex',
        flexDirection: window.innerWidth < 768 ? 'column' : 'row',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        backdropFilter: 'blur(4px)',
        margin: 0,
        overflow: 'hidden'
      }}>
        {/* Left side - Welcome section */}
        <div style={{
          flex: 1,
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'left',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0)'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#2c3e50'
          }}>WELCOME !</h1>
          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            lineHeight: '1.6',
            color: '#000000',
            maxWidth: '500px'
          }}>
            Découvrez notre espace de coworking innovant conçu pour stimuler la créativité et la productivité. 
            Rejoignez une communauté dynamique de professionnels et profitez d'un environnement de travail inspirant.
          </p>
        </div>

        {/* Right side - Login form */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          backgroundColor: 'rgba(255, 255, 255, 0)'
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            padding: '40px',
            borderRadius: '15px',
            width: '100%',
            maxWidth: '400px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{
              textAlign: 'center',
              marginBottom: '30px',
              color: '#2c3e50'
            }}>Connexion</h2>
            
            {error && (
              <div style={{
                padding: '10px',
                backgroundColor: '#ffebee',
                color: '#c62828',
                borderRadius: '4px',
                marginBottom: '20px',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
                <input 
                  type="email" 
                  className="form-control" 
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    marginBottom: '20px'
                  }}
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                />
              </div>
              <div className="mb-3">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Mot de passe</label>
                <input 
                  type="password" 
                  className="form-control" 
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    marginBottom: '25px'
                  }}
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                />
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: isSubmitting ? '#bdc3c7' : '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = '#2980b9')}
                onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = '#3498db')}
              >
                {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
              </button>
            </form>
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <span>Vous n'avez pas un compte ? </span>
              <Link to="/register" style={{ color: '#2980b9', fontWeight: '600', textDecoration: 'none' }}>
                Créer un compte
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}