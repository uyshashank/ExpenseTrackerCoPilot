import React, { useState } from 'react';
import { register, login } from './api';

interface AuthProps {
  onAuth: (token: string) => void;
}

const Auth: React.FC<AuthProps> = ({ onAuth }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      if (isLogin) {
        const res = await login(username, password);
        if (res.token) {
          onAuth(res.token);
        } else {
          setError(res.message || 'Login failed');
        }
      } else {
        const res = await register(username, password);
        if (res.message === 'User registered') {
          setIsLogin(true);
        } else {
          setError(res.message || 'Registration failed');
        }
      }
    } catch {
      setError('Network error');
    }
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={() => { setIsLogin(!isLogin); setError(''); }}>
        {isLogin ? 'Create an account' : 'Back to login'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Auth;
