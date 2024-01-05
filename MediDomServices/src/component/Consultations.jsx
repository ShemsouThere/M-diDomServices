import { useState , React, useEffect} from "react";
import axios from "axios";


const Consultations = ({ isAuthenticated ,userRole}) => {

    const [consultations, setConsultations] = useState([]);

    const getConsultations = async () => {
        try {

            const response = await axios.get('/api/consultation/');
            const data = response.data;
            console.log(data);
            setConsultations(data);

        } catch (error) {
            console.error('Error getting consultations:', error);
        }
    };
    
useEffect(() => {
        getConsultations();
}, []);

return (
<>
<section className='Consultations'>
<h2>Mes Consultations</h2>

{isAuthenticated && userRole==='client'&&
(
<>
        
        {/* Display consultations in rows */}
        {consultations.map((consultation, index) => (
              <div key={index}>
                <p><b>Consultation N°: {index+1}</b></p>
                <p>Heure: {consultation.Heure}</p>
                <p>Date: {consultation.Date}</p>
                <p>Type: {consultation.Type}</p>
              </div>
            ))}
        
</>
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