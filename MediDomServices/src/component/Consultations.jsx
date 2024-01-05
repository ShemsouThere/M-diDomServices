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
<h2>Consultations Page</h2>

{isAuthenticated && userRole==='client'&&
(
<>
        
        {/* Display consultations in rows */}
        {consultations.map((consultation, index) => (
              <div key={index}>
                <h4>Consultation N°: {index+1}</h4>
                <h4>Heure: {consultation.Heure}</h4>
                <h4>Date: {consultation.Date}</h4>
                <h4>Type: {consultation.Type}</h4>
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