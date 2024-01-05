import React from "react";
import Client from "../Client/client.jsx"



// We'll check if he's authenticated and userRole="client"
// if true
//render the <Client />

// If he's not authenticated we'll return  something like "Vous ne pouvez pas prendre un RDV sans etre authentifié"



const Rendezvous = ({ isAuthenticated ,userRole}) => {
return (
<>
<section className='ktiba'>
    {isAuthenticated && userRole==='client' && 
    (
< Client />
    )}



    {!isAuthenticated && (
    <>
        <h2>You are not authenticated!</h2>
        <p>Notify the user that he must be authenticated, Show him a preview of the "Prendre un RDV" Form and when he clicks on "Enregistrer" Redirect him to "/Register"</p>
    </>
    )}


</section>
</>
);
};

export default Rendezvous;