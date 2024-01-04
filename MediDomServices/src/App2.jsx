import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './component/Home.jsx';
import Consultations from './component/Consultations.jsx';
import Rendezvous from './component/Rendezvous.jsx';
import Navbar from './component/Navbar.jsx';
import Footer from './component/Footer.jsx';
import LoginForm from './component/Auth/LoginForm.jsx';
import Account from './component/Auth/Account.jsx';
import RegisterForm from './component/Auth/RegistrationForm.jsx';

import Statistiques from './component/Responsable/Statistiques.jsx';


import React, { useState, useEffect } from 'react';
import axios from 'axios';






function App2() {
  
  const [isAuthenticated, setIsAuthenticated] = useState({
    isAuthenticated: '',
    userRole: '',
  })
  
  
  const getSession = async () => {
    try {
      // Make a GET request to the "/api/user/session/" URL with "same-origin" credentials
      const response = await axios.get("/api/user/session/", {
        withCredentials: true,
      });
  
      const data = response.data; // Extract data from the response
  
      console.log(data); // Log the response data to the console
  
      // If the response indicates the user is authenticated
      if (data.isAuthenticated) {
        // Update the component's state
        setIsAuthenticated({ isAuthenticated: true, userRole: data.userRole });
      } else {
        // If the response indicates the user is not authenticated
        // Update the component's state
        setIsAuthenticated({ isAuthenticated: false });
      }
    } catch (error) {
      // Handle any errors that occurred during the Axios request
      console.error(error);
    }
  };
  
  
  useEffect(() => {
    getSession();
  
  }, []);



return (
<>

<Navbar isAuthenticated={isAuthenticated.isAuthenticated} userRole={isAuthenticated.userRole}/>
<Routes>
<Route path="/" element={<Home />} />



{isAuthenticated.userRole !== 'responsable' && (
  <>
<Route path="/Consultations" element={<Consultations />} />
<Route path="/RendezVous" element={<Rendezvous />} />
  </>
)}

{isAuthenticated.userRole === 'responsable' && (
  <>
<Route path="/Statistiques" element={<Statistiques />} />
<Route path="/Consultations" element={<Consultations />} />
  </>
)}


{!isAuthenticated.isAuthenticated && (
  <>
<Route path="/Register" element={<RegisterForm />} />
<Route path="/Login" element={<LoginForm />} />
  </>
)}
{isAuthenticated.isAuthenticated && (
<Route path="/Account" element={<Account />} />
)}
</Routes>
<Footer />
</>
);
}

export default App2;