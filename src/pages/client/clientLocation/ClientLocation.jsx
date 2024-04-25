import React, { useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Popup } from 'react-leaflet';
import { useLocation } from 'react-router-dom';
import { EnvironmentOutlined } from '@ant-design/icons';

const ClientLocation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const commune = searchParams.get('commune');
  const avenue = searchParams.get('avenue');
  const num = searchParams.get('num');
  const clientAddress = `Kinshasa, ${commune}, ${avenue}, ${num}`;
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


  return (
    <div>
      {currentPosition ? (
        <MapContainer center={currentPosition} zoom={19} scrollWheelZoom={false} style={{ height: '550px' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
          <Popup position={currentPosition} autoPan={false}>
            <EnvironmentOutlined style={{ fontSize: '20px', marginRight: '8px', color: 'red' }} />
            {clientAddress}
          </Popup>
        </MapContainer>
      ) : <div style={{height: "100vh", display: 'flex', alignItems:'center', justifyContent:'center', padding:'20px', fontSize:'13px'}}>
            <span style={{textAlign:'center'}}> Aucune localisation n'a été définie sur la carte pour ce client. Souhaitez-vous  en ajouter une ?</span>
        </div>
      }
    </div>
    
  );
};

export default ClientLocation;