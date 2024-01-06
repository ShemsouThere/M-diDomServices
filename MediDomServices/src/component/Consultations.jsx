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


// Function to determine the color based on the status
const getStatusColor = (status) => {
    switch (status) {
      case 'En attente':
        return 'orange';
      case 'Refusée':
        return 'red';
      default:
        return 'green';
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
                <label>
                    Status: {' '}
                        <span style={{ color: getStatusColor(consultation.Status) }}>
                            {consultation.Status}
                        </span>
                </label>
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