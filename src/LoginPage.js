import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Hardcoded credentials as per original request
    if (email === 'admin@123.com' && password === 'admin@123') {
      // Simulate successful login
      window.location.href = '/dashboard';
    } else {
      setError('Invalid login credentials');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h2>Login</h2>
      {error && (
        <div style={{
          color: 'red',
          marginBottom: '10px'
        }}>
          {error}
        </div>
      )}
      <form 
        onSubmit={handleLogin}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '300px'
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            margin: '10px 0',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            margin: '10px 0',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc'
          }}
          required
        />
        <button
          type="submit"
          style={{
            margin: '10px 0',
            padding: '10px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}