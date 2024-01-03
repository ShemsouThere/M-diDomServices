import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import App2 from './App2.jsx'
import Client from './Client/client.jsx'
import RegistrationForm from './Auth/RegistrationForm.jsx';

// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter>
      <App2 />
    </BrowserRouter>
    // <App />
    // <RegistrationForm />
    // <Client />


    
)
