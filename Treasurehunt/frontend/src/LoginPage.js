import React, { useState } from 'react';
import './LoginPage.css'; // Import the CSS file

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:5000/login', {  // Update this URL with your actual backend URL
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        setMessage(data.message);
    };

    return (
        <div className="login-page">
            <video className="background-video" autoPlay loop muted>
                <source src="/videos/Login_Vid.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="username-input"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="password-input"
                        required
                    />
                    <button type="submit" className="login-button">Login</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default LoginPage;
