import React from "react";

const Consultations = ({ isAuthenticated ,userRole}) => {
return (
<>
<section className='Consultations'>
<h1>Consultations Page</h1>

{isAuthenticated && userRole==='client'&&
(

        
        <h1>Interface Client</h1>
        

)}

{isAuthenticated && userRole==='responsable'
&&(

    
        <h1>Interface Responsable</h1>
        

)}

{!isAuthenticated && 
(
<h1>You are not authenticated!</h1>
)}



</section>
</>
);
};

export default Consultations;