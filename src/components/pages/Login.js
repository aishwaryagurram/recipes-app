import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from '../../TranslationContext';
import { useAuth } from '../../AuthContext';
import './Auth.css';

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const { login } = useAuth();

  const handleSubmit = e => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError(t('fillAllFields'));
      return;
    }
    // Implement login logic
    login({ email }); // Set user as logged in
    alert(t('loginSuccess'));
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2 className="auth-title">{t('userLogin')}</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <span className="input-icon" role="img" aria-label="user">&#128100;</span>
            <input
              type="email"
              placeholder={t('email')}
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <span className="input-icon" role="img" aria-label="lock">&#128274;</span>
            <input
              type="password"
              placeholder={t('password')}
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="auth-options">
            <label>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
              />
              {t('rememberMe')}
            </label>
            <Link to="/forgot-password" className="forgot-password">
              {t('forgotPassword')}
            </Link>
          </div>
          {error && <div className="auth-error">{error}</div>}
          <button type="submit" className="auth-button login-button">{t('login')}</button>
        </form>
        <button
          className="auth-button register-button"
          onClick={() => navigate('/register')}
        >
          {t('register')}
        </button>
      </div>
    </div>
  );
}

export default Login;
