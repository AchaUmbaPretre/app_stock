import React, { useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Popup } from 'react-leaflet';
import { useLocation } from 'react-router-dom';
import { EnvironmentOutlined,WhatsAppOutlined,UserOutlined  } from '@ant-design/icons';
import L from 'leaflet';
import { getDistance } from 'geolib';

const Localisation = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const commune = searchParams.get('commune');
  const quartier = searchParams.get('quartier');
  const avenue = searchParams.get('avenue');
  const num = searchParams.get('num');
  const clientAddress = `Kinshasa, ${commune}, ${avenue}, ${num}`;
  const [currentPosition, setCurrentPosition] = useState(null);
  const [boutiquePosition, setBoutiquePosition] = useState(null);
  const [distance, setDistance] = useState(null)
  const [userPosition, setUserPosition] = useState(null);

  const boutiqueCommune = 'Ngaliema';
  const boutiqueQuartier = 'Lalu';
  const boutiqueAvenue = 'kinshasa';
  const boutiqueAddress = `Kinshasa, ${boutiqueCommune}, ${boutiqueQuartier}, ${boutiqueAvenue}`;


  useEffect(() => {
    const watchUserPosition = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition([latitude, longitude]);
      },
      (error) => {
        console.error('Erreur lors de la récupération de la position de l\'utilisateur:', error);
      }
    );
  
    return () => {
      // Arrête de suivre la position de l'utilisateur lorsque le composant est démonté
      navigator.geolocation.clearWatch(watchUserPosition);
    };
  }, []);


  useEffect(() => {
    const geocodeAddress = async () => {
        if (boutiqueAddress) {
            try {
              const boutiqueResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent('Kinshasa', 'ngaliema', 'lula','40')}`);
              const boutiqueData = await boutiqueResponse.json();
    
              if (boutiqueData.length > 0) {
                const { lat, lon } = boutiqueData[0];
                setBoutiquePosition({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
              } else {
                console.log('Aucun résultat de géocodage trouvé pour l\'adresse de la boutique spécifiée.');
              }
            } catch (error) {
              console.error('Erreur lors du géocodage de l\'adresse de la boutique:', error);
            }
        }
    
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
  }, [clientAddress,boutiqueAddress]);

  useEffect(() => {
    if (boutiquePosition && currentPosition) {
      const calculatedDistance = getDistance(boutiquePosition, currentPosition);
      setDistance(calculatedDistance);
    }
  }, [boutiquePosition, currentPosition]);


  return (
    <div>
      {currentPosition && (
        <MapContainer center={userPosition || currentPosition} zoom={20} scrollWheelZoom={false} style={{ height: '500px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {userPosition && (
            <Popup position={userPosition} autoPan={false}>
              <UserOutlined style={{ fontSize: '20px', marginRight: '8px', color: 'blue' }} />
              Position de l'utilisateur
            </Popup>
          )}
          {currentPosition && (
            <Popup position={currentPosition} autoPan={false}>
              <EnvironmentOutlined style={{ fontSize: '20px', marginRight: '8px', color: 'red' }} />
              {clientAddress}
            </Popup>
          )}
        </MapContainer>
      )}
  
      {/* <p style={{margin:'10px',color: 'rgb(3, 3, 109)'}}>Distance entre la boutique et le client : {distance && distance} mètres.</p> */}
    </div>
  );
};

export default Localisation;