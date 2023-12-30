import React, { useState } from 'react';
import axios from 'axios';
import Cookies from "universal-cookie";
const cookies = new Cookies();

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    email: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    userRole: 'client',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
        console.error('Passwords do not match');
        return;
    }
    
    try {
        const response = await axios.post('/api/register/', formData, {
            headers: {
            "X-CSRFToken": cookies.get("csrftoken"), // Include the CSRF token
        },
      });
      console.log('Registration successful:', response.data);
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
      </label>
      <br />
      
        <label>
        First Name:
        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
      </label>
      <br />

      <label>
        Last Name:
        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
      </label>
      <br />

      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </label>
      <br />

      <label>
        Phone Number:
        <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
      </label>
      <br />

      <label>
        Password:
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </label>
      <br />
      <label>
        Confirm Password:
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
      </label>
      <br />

      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
