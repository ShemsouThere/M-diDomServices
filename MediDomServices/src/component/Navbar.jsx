import { Link } from 'react-router-dom';
import React from "react";

const Navbar = () => {
return (
<header>
<div className="logo">
MediDomServices
</div>
<div className="display-menu">
<Link className='menu' to={""}>HOME</Link>
<Link className='menu' to={"/services"}>Services</Link>
<Link className='menu' to={"/rendezvous"}>Rendezvous</Link>
</div>
</header>
);
};

export default Navbar;