import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { MdOutlineManageAccounts } from "react-icons/md";
import { IoLogIn } from "react-icons/io5";
import { FaUnlock } from "react-icons/fa6";
import './Navbar.css';

// eslint-disable-next-line react/prop-types
const Navbar = ({ isAuthenticated ,userRole}) => {
  const handleIconClick = () => {
    // Add functionality for when the icon is clicked
    console.log('Icon clicked!');
    // Add your desired action here
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <span>MediDomServices</span>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
        <Link className='nav-link' to={"/"}>Home</Link>
        </li>

        {userRole !== 'responsable' && (
        <>
        <li className="nav-item">
        <Link className='nav-link' to={"/Consultations"}>Consultations</Link>
        </li>
        <li className="nav-item">
        <Link className='nav-link' to={"/RendezVous"}>Rendez-vous</Link>
        </li>
            </>
        )}

{/* 
        <li className="nav-item">
          <a href="/" className="nav-link">Services</a>
        </li>
        <li className="nav-item">
          <a href="/" className="nav-link">Rendez-vous</a>
        </li> */}


        {userRole === 'responsable' && (
        <>
        <li className="nav-item">
         <Link className='nav-link' to={"/Consultations"}>Consultations</Link>
         </li>
         <li className="nav-item">
         <Link className='nav-link' to={"/Statistiques"}>Statistiques</Link>
         </li>
             </>
         )}

      </ul>
      <ul className='navbar-icons'>

        {!isAuthenticated && (
           <>
           <li className='nav-icons'>
           <Link className='icon-link' to={"/Login"} onClick={handleIconClick}><FaUnlock size={20}/></Link>
           </li>
           <li className='nav-icons'>
           <Link className='icon-link' to={"/Register"} onClick={handleIconClick}><IoLogIn size={30} /></Link>
           </li>
           </>
      )}
        {isAuthenticated && (
            <li className='nav-icons'>
            <Link className={` icon-link`} onClick={handleIconClick} to={"/Account"}>
              <MdOutlineManageAccounts size={30} />
            </Link>
            </li>
          )}


      </ul>
    </nav>
  );
};

export default Navbar;





/*const Navbar = ({ isAuthenticated ,userRole}) => {
return (
<header>
<div className="logo">
MediDomServices
</div>
<div className="display-menu">
<Link className='menu' to={"/"}>Home</Link>

{/* COTE RESPONSABLE *//*}
/*
{userRole === 'responsable' && (
    <>
<Link className='menu' to={"/Consultations"}>Consultations</Link>
<Link className='menu' to={"/Statistiques"}>Statistiques</Link>
    </>
)}


{/* COTE CLIENT *//*}
{userRole !== 'responsable' && (
    <>
<Link className='menu' to={"/Consultations"}>Consultations</Link>
<Link className='menu' to={"/RendezVous"}>Rendez-vous</Link>
    </>
)}
{/* END COTE CLIENT *//*}



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

export default Navbar;*/