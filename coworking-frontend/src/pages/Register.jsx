import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api, { setAuthToken } from '../services/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await api.post('/register', { name, email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      setAuthToken(token);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || "Erreur lors de l'inscription");
    } finally {
      setIsLoading(false);
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
        flexDirection: isMobile ? 'column' : 'row',
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
          justifyContent: 'center',
              alignItems: 'center',
          textAlign: 'left',
          backgroundColor: 'rgba(255, 255, 255, 0)'
        }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#2c3e50'
          }}>REJOIGNEZ-NOUS</h1>
          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            lineHeight: '1.6',
            color: '#000000',
            maxWidth: '500px'
          }}>
            Créez un compte pour accéder à notre espace de coworking moderne. Profitez d’une communauté dynamique et d’un environnement propice à l’innovation.
          </p>
        </div>

        {/* Right side - Register form */}
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          backgroundColor: 'rgba(111, 121, 158, 0)'
        }}>
          <div style={{
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
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
            }}>Créer un compte</h2>

            {error && (
              <div className="alert alert-danger">{error}</div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Nom complet</label>
                <input
                  type="text"
                  className="form-control"
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ddd',
                    marginBottom: '20px'
                  }}
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </div>

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
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#2ecc71',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#27ae60'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#2ecc71'}
              >
                {isLoading ? 'Chargement...' : 'S\'inscrire'}
              </button>
            </form>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <span>Déjà un compte ? </span>
              <Link to="/login" style={{ color: '#2980b9', fontWeight: '600', textDecoration: 'none' }}>
                Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
