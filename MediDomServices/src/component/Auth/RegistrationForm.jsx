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
    NSS: '', 
    DNS: '', 
    pathologies_chroniques: '', 
    sous_trait_medi_part: '', 
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
    console.log(formData);
    try {
        const response = await axios.post('/api/user/register/', formData, {
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
        NSS:
        <input type="text" name="NSS" value={formData.NSS} onChange={handleChange} max={15} />
      </label>
      <br />

      <label>
        Date De Naissance:
        <input type="date" name="DNS" value={formData.DNS} onChange={handleChange} min="1800-01-01" max={new Date().toISOString().split('T')[0]} />
      </label>
      <br />

      <label>
        Phone Number:
        <input type="number" name="phone_number" value={formData.phone_number} onChange={handleChange} maxLength={10} />
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



      <label>
        Pathologies Chroniques:
        <textarea name="pathologies_chroniques" value={formData.pathologies_chroniques} onChange={handleChange} />
      </label>
      <br />

      <label>
        Sous Trait Medi Part:
        <textarea name="sous_trait_medi_part" value={formData.sous_trait_medi_part} onChange={handleChange} />
      </label>
      <br />


      <button type="submit">Register</button>
    </form>
  );
};

export default RegistrationForm;
