import React from "react";
import Client from "../Client/client.jsx"



// We'll check if he's authenticated and userRole="client"
// if true
//render the <Client />

// If he's not authenticated we'll return  something like "Vous ne pouvez pas prendre un RDV sans etre authentifié"



const Rendezvous = () => {
return (
<>
<section className='ktiba'>
< Client />
</section>
</>
);
};

export default Rendezvous;