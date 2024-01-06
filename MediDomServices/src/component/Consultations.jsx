import { useState , React, useEffect} from "react";
import axios from "axios";
import './Consultations.css';



const Consultations = ({ isAuthenticated ,userRole}) => {


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
  
    const handlePopup = (index,content,btn) => {
    //   const combinedContent = `Consultation N°${index}\nAdditional Content: ${content}`;
      const combinedContent = (
        <div>
          <p>Consultation N°{index}:</p>
          {btn == 1 &&(
              <p>Pathologies Chroniques: {content}</p>
          )}
          {btn == 2 && (
              <p>Traitement Particulier: {content}</p>

          )}
        </div>
      );
      setModalContent(combinedContent);
      setIsModalOpen(true);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };


    const [consultations, setConsultations] = useState([]);

    const getConsultations = async () => {
        if(userRole == 'client'){
        try {
            const response = await axios.get('/api/consultation/');
            const data = response.data;
            console.log(data);
            setConsultations(data);
            
        } catch (error) {
            console.error('Error getting consultations:', error);
        }

        }else if(userRole === 'responsable'){
            try {
                const response = await axios.get('/api/responsable-consultations/');
                const data = response.data;
                console.log(data);
                setConsultations(data);
                
            } catch (error) {
                console.error('Error getting consultations:', error);
            }
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
}, [userRole]);

return (
<>
<section className='Consultations'>

    {/* INTERFACE CLIENT */}
{isAuthenticated && userRole==='client'&&
(
<>

<h2 style={{textAlign: 'center'}}>Mes Consultations</h2>
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

{/* END INTERFACE CLIENT */}





{/* INTERFACE RESPONSABLE */}

{isAuthenticated && userRole==='responsable'
&&(
    <>
    <h2 style={{textAlign: 'center'}}>Consultations Disponible:</h2>

    {/* Display consultations in a table */}
    <table>
      <thead>
        <tr>
            <th style={{ width: '5%' }}>Consultation</th>
            <th style={{ width: '10%' }}>Heure</th>
            <th style={{ width: '10%' }}>Date</th>
            <th style={{ width: '10%' }}>Type</th>
            <th style={{ width: '15%' }}>Pathologies Chroniques</th>
            <th style={{ width: '15%' }}>Traitement Particulier</th>
            <th style={{ width: '15%' }}>Status</th>
            <th style={{ width: '20%' }}>Actions</th>

        </tr>
      </thead>
      <tbody>
        {consultations.map((consultation, index) => (
          <tr key={index}>
            <td>N°{index + 1}</td>
            <td>{consultation.Heure}</td>
            <td>{consultation.Date}</td>
            <td>{consultation.Type}</td>
            <td>
              <button style={{cursor:'pointer'}} onClick={() => handlePopup(index+1,consultation.PathologiesChroniques,1)}>
                Voir
              </button>
            </td>
            <td>
              <button style={{cursor:'pointer'}} onClick={() => handlePopup(index+1,consultation.TraitementParticulier,2)}>
              Voir
              </button>
            </td>
            <td>
              <span style={{ color: getStatusColor(consultation.Status) }}>
                {consultation.Status}
              </span>
            </td>
            <td>
              <button style={{cursor:'pointer'}} onClick={() => handleDecline(consultation)}>
                Decline
              </button>
              <button style={{cursor:'pointer'}} onClick={() => handleAccept(consultation)}>
                Accept
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </>
)}

{/* END INTERFACE RESPONSABLE */}




{/* INTERFACE VIEWER */}


{!isAuthenticated && 
(
<h1>You are not authenticated!</h1>
)}

{/* END INTERFACE VIEWER */}


{/* Modal */}
{isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>
              &times;
            </span>
            {modalContent}
          </div>
        </div>
      )}

</section>
</>
);
};

export default Consultations;