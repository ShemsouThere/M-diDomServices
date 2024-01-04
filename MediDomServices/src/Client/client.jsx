// client.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Client = () => {
    
  const [consultationType, setConsultationType] = useState('');
  const [formData, setFormData] = useState({
      Date: '',
      Heure: '',
      Type:'',
      User:'',
  });
  const [showPayerButton, setShowPayerButton] = useState(false);
  const [validerClicked, setValiderClicked] = useState(true);





  const whoami = async () => {
    try {
        const response = await axios.get("/api/user/session/", {

            withCredentials: true,  // Equivalent to credentials: "same-origin"
        });
        
        const data = response.data;
        console.log('You are logged in as:', data);


        setFormData({
            ...formData,
            User : data.user, 
          });
    } catch (error) {
        console.error(error);
    }
};

  useEffect(() => {

    whoami()

    // Retrieve the consultation number from local storage
    // const storedConsultationNumber = localStorage.getItem('consultationNumber');
    // if (storedConsultationNumber) {
    //   setFormData((prevFormData) => ({
    //     ...prevFormData,
    //     // consultationNumber: parseInt(storedConsultationNumber, 10),
    //   }));
    // }
  }, []);


  const handleConsultationTypeChange = (type) => {
    setConsultationType(type);

  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      Type : consultationType,
      
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Increment the consultation number and store it in local storage
    // const newConsultationNumber = formData.consultationNumber + 1;
    // localStorage.setItem('consultationNumber', newConsultationNumber);


    // Show the "Payer" button
    setShowPayerButton(true);
    // Remove the "Valider" button
    setValiderClicked(false);

        // Check that required fields are present in formData
        if (!formData.Date || !formData.Heure || !formData.Type) {
          console.error('Please fill in all required fields.');
          return;}
    try {
      // Send consultation information to the backend
        console.log(formData);
    //   console.log(axios.post('/api/consultation/', formData, { headers }));
      const response = await axios.post('/api/consultation/',formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      // Handle the response, e.g., show a success message to the user
      console.log('Consultation scheduled successfully:', response.data);
    } catch (error) {
      console.error('Error scheduling consultation:', error);
    }
  };

  const handlePayment = async () => {
    try {
      // Send payment information to the backend (fake prototype)
      const paymentResponse = await axios.post('/api/process-payment/', {
        amount: 50, // Replace with the actual amount
      });

      // Handle the payment response, e.g., show a success message to the user
      console.log('Payment successful:', paymentResponse.data);

      // Send confirmation email to the patient (fake prototype)
      const emailResponse = await axios.post('/api/send-confirmation-email/', {
        email: 'patient@example.com', // Replace with the actual patient email
        date: formData.consultationDate,
      });

      console.log('Confirmation email sent:', emailResponse.data);
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  const handleCancellation = async () => {
    try {
      // Send cancellation information to the backend
      const cancellationResponse = await axios.delete('/api/consultation/', {
        // data: { consultationNumber: formData.consultationNumber },
      });

      // Handle the cancellation response, e.g., show a success message to the user
      console.log('Consultation canceled successfully:', cancellationResponse.data);
    } catch (error) {
      console.error('Error canceling consultation:', error);
    }
  };

  return (
 
          <>
            <h2>Prendre un RDV</h2>
            <div>
              <button onClick={() => handleConsultationTypeChange('medicale')}>
                Consultation Médicale
              </button>
              <button onClick={() => handleConsultationTypeChange('paramedicale')}>
                Consultation Paramédicale
              </button>
            </div>
            <label>
              Consultation <strong>N°</strong>
            </label>
            {consultationType && (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                <label>
                  Date de consultation:
                  <input
                    type="date"
                    name="Date"
                    value={formData.Date}
                    onChange={handleFormChange}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </label>

                <label>
                  Heure de consultation:
                  <input
                    type="time"
                    name="Heure"
                    value={formData.Heure}
                    onChange={handleFormChange}
                    required
                  />
                </label>

                <label>
                  Service demandé:<strong>{consultationType}</strong>
                </label>
                {showPayerButton && (
                  <button type="button" onClick={handlePayment}>
                    Payer
                  </button>
                )}

                {validerClicked && (
                  <button
                    type="submit"
                    style={{
                      backgroundColor: 'green',
                      height: '30px',
                      width: '25%',
                      borderRadius: '40px',
                    }}
                  >
                    Enregistrer réservation
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleCancellation}
                  style={{
                    backgroundColor: 'red',
                    height: '30px',
                    width: '25%',
                    borderRadius: '40px',
                  }}
                >
                  Annuler réservation
                </button>
              </form>
            )}
          </>


                
  );
};

export default Client;
