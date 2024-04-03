import React, { useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Localisation = () => {
    const [clientAddress, setClientAddress] = useState('Kinshasa, ngaliema');
    const [currentPosition, setCurrentPosition] = useState(null)
    const position = [51.505, -0.09]


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
        <MapContainer center={currentPosition} zoom={13} scrollWheelZoom={false} style={{ height: '500px' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={currentPosition}>
            <Popup>{clientAddress}</Popup>
            </Marker>
        </MapContainer>
        )}
        </div>    
  )
}

export default Localisation