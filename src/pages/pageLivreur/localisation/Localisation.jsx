import React, { useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Popup } from 'react-leaflet';
import { useLocation } from 'react-router-dom';
import { EnvironmentOutlined,WhatsAppOutlined } from '@ant-design/icons';
import L from 'leaflet';

const Localisation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const commune = searchParams.get('commune');
  const quartier = searchParams.get('quartier');
  const avenue = searchParams.get('avenue');
  const num = searchParams.get('num');
  const clientAddress = `Kinshasa, ${commune}, ${quartier}, ${num}`;
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    const geocodeAddress = async () => {
      if (clientAddress) {
        try {
          const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(clientAddress)}`);
          const data = await response.json();

          if (data.length > 0) {
            const { lat, lon } = data[0];
            setCurrentPosition([parseFloat(lat), parseFloat(lon)]);
          } else {
            console.log('Aucun résultat de géocodage trouvé pour l\'adresse spécifiée.');
          }
        } catch (error) {
          console.error('Erreur lors du géocodage:', error);
        }
      }
    };

    geocodeAddress();
  }, [clientAddress]);

  const handleSendLocation = () => {
    // Ouvrir l'application WhatsApp avec la localisation pré-remplie dans le message
    const message = `Voici la localisation trouvée : ${currentPosition}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedMessage}`;
    window.open(whatsappUrl);
  };

  return (
    <div>
      {currentPosition && (
        <MapContainer center={currentPosition} zoom={20} scrollWheelZoom={false} style={{ height: '500px' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Popup position={currentPosition} autoPan={false}>
            <EnvironmentOutlined style={{ fontSize: '20px', marginRight: '8px', color: 'red' }} />
            {clientAddress}
          </Popup>
        </MapContainer>
      )}

      {currentPosition && (
        <button onClick={handleSendLocation} style={{border:'none',padding:'10px', margin: '10px', borderRadius:'5px', display:'flex', alignItems:'center', gap:"5px",color: 'rgb(3, 3, 109)'}}>Partager la localisation en direct <WhatsAppOutlined style={{ fontSize: '15px', color: 'green' }}/></button>
      )}
    </div>
  );
};

export default Localisation;