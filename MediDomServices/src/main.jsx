// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom/client'
// eslint-disable-next-line no-unused-vars
import App from './App.jsx'
import RegistrationForm from './Auth/RegistrationForm.jsx';
import Navbar from './components/navbar.jsx';
// import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
     // eslint-disable-next-line react/jsx-no-comment-textnodes
     <><Navbar />
        // <App />
        <RegistrationForm /></>
    
)
