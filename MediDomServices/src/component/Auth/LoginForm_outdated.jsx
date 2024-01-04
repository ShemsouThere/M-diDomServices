// LoginForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/user/login/', {
        username,
        password,
      },
      {headers: {
        "X-CSRFToken": cookies.get("csrftoken"), // Include the CSRF token
                },
      }
      );

      // Save the token to local storage or cookie
      localStorage.setItem('token', response.data.access);
      
      // Redirect or perform other actions upon successful login
      console.log('Login successful!', response.data);

      // Conditional rendering 
      

    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
