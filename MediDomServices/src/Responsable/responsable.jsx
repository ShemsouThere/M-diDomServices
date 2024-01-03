import React, { useState } from 'react';
import App from '../App.jsx'

const ResponsibleInterface = () => {
  const [selectedView, setSelectedView] = useState('consultations'); // Default view

  const handleViewChange = (view) => {
    setSelectedView(view);
  };

const goHome = () => {
    return(<App/>)
}


  return (
    <div>
      <h1>MédiDomServices - Interface Responsable</h1>
      <div>
        <button onClick={() => handleViewChange('consultations')}>
          Gestion des Consultations
        </button>
        <button onClick={() => handleViewChange('statistics')}>
          Statistiques
        </button>
      </div>

      {selectedView === 'consultations' && (
        <div>
          <h2>Gestion des Consultations</h2>
          {/* Add components and functionality related to consultation management */}
        </div>
      )}

      {selectedView === 'statistics' && (
        <div>
          <h2>Statistiques</h2>
          {/* Add components and functionality related to statistics */}
        </div>
      )}


        <div>
            <button onClick={goHome}>Home</button>
        </div>

    </div>
  );
};

export default ResponsibleInterface;
