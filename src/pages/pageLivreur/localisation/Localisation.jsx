import React, { useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useLocation } from 'react-router-dom';
import { EnvironmentOutlined } from '@ant-design/icons';
import L from 'leaflet';

const Localisation = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const commune = searchParams.get('commune');
    const quartier = searchParams.get('quartier');
    const avenue = searchParams.get('avenue');
    const num = searchParams.get('num');
/*     const [clientAddress, setClientAddress] = useState(`Kinshasa, ${commune}, ${quartier}`); */
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
      }, [clientAddress])


  return (
        <div>
        {currentPosition && (
        <MapContainer center={currentPosition} zoom={20} scrollWheelZoom={false} style={{ height: '500px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={currentPosition} icon={L.icon({ iconUrl:  <EnvironmentOutlined style={{ fontSize: '20px', marginRight: '8px', color: 'black' }} /> })}>
            <Popup>
            <EnvironmentOutlined style={{ fontSize: '20px', marginRight: '8px', color: 'RED' }} />
            {clientAddress}
            </Popup>
            </Marker>
        </MapContainer>
        )}
        </div>    
  )
}

export default Localisation