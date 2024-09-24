import React, { useState } from 'react';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch(`https://hunt-two.vercel.app/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
    });

    const data = await response.json();
      
    if (!response.ok) {
        console.log(response);
        console.log(data);
        console.error('Login error:', error);
        console.log('Server response:', data ?? response ?? "null"); // Added line to log response
        setMessage(data?.message || 'Login failed. Please try again.'); // Updated message
    }

    setMessage(data.message);
    }
  };

  return (
    <div className="login-page">
      <video className="background-video" autoPlay loop muted>
        <source src="/videos/Login_Vid.mp4" type="video/mp4" />
      </video>
      <div className="container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            className="username-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <input
            className="password-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
