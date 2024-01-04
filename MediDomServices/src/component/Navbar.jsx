import { Link } from 'react-router-dom';
import React from "react";

const Navbar = ({ isAuthenticated ,userRole}) => {
return (
<header>
<div className="logo">
MediDomServices
</div>
<div className="display-menu">
<Link className='menu' to={"/"}>Home</Link>

{/* COTE RESPONSABLE */}

{userRole === 'responsable' && (
    <>
<Link className='menu' to={"/Consultations"}>Consultations</Link>
<Link className='menu' to={"/Statistiques"}>Statistiques</Link>
    </>
)}


{/* COTE CLIENT */}
{userRole !== 'responsable' && (
    <>
<Link className='menu' to={"/Consultations"}>Consultations</Link>
<Link className='menu' to={"/RendezVous"}>Rendez-vous</Link>
    </>
)}
{/* END COTE CLIENT */}



{isAuthenticated && (
<Link className='menu' to={"/Account"}>Account</Link>
)}
{!isAuthenticated && (
    <>
<Link className='menu' to={"/Login"}>Login</Link>
<Link className='menu' to={"/Register"}>Register</Link>
    </>
)}
</div>
</header>
);
};

export default Navbar;