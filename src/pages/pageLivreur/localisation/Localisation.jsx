import React, { useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { useLocation, useNavigate } from 'react-router-dom';
import { EnvironmentOutlined,WhatsAppOutlined,UserOutlined  } from '@ant-design/icons';
import L from 'leaflet';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../../../config';

const Localisation = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const commune = searchParams.get('commune');
  const quartier = searchParams.get('quartier');
  const avenue = searchParams.get('avenue');
  const num = searchParams.get('num');
  const clientAddress = `Kinshasa, ${commune}, ${avenue}, ${num}`;
  const [currentPosition, setCurrentPosition] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [isUserPopupOpen, setIsUserPopupOpen] = useState(true);
  const user = useSelector((state) => state.user.currentUser.username);
  const [iSLoading, setIsLoading] = useState(false)
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    const watchUserPosition = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude)
        setLon(longitude)
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

  console.log(lat)
  console.log(lon)


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


/*   useEffect(() => {
    if (boutiquePosition && currentPosition) {
      const calculatedDistance = getDistance(boutiquePosition, currentPosition);
      setDistance(calculatedDistance);
    }
  }, [boutiquePosition, currentPosition]); */

  const handleClick = async (e) => {
    e.preventDefault();

    try{
      setIsLoading(true);
      await axios.put(`${DOMAIN}/api/client/clientLocation`)
      Swal.fire({
        title: 'Success',
        text: 'Localisation a été enregistrée avec succès!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      window.location.reload();

    }catch(err) {
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      {currentPosition ? (
        <MapContainer center={userPosition || currentPosition} zoom={17} scrollWheelZoom={false} style={{ height: '590px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {userPosition && (
            <Popup position={userPosition} autoPan={isUserPopupOpen}>
              <UserOutlined style={{ fontSize: '20px',marginRight: '8px', color: 'red' }} />
              {user}
            </Popup>
          )}
          {currentPosition && (
          <Marker position={currentPosition} icon={L.icon({ iconUrl: 'path/vers/icone.png', iconSize: [20, 20] })}>
            <Popup position={currentPosition} autoPan={isUserPopupOpen}>
              <EnvironmentOutlined style={{ fontSize: '20px', marginRight: '8px', color: 'red' }} />
              {clientAddress}
            </Popup>
          </Marker>
        )}
        </MapContainer>
      ) : <div style={{height: "95vh", display: 'flex', alignItems:'center', justifyContent:'center', padding:'20px', fontSize:'13px'}}>
        <span style={{textAlign:'center'}}>Aucune localisation n'a été définie sur la carte pour ce client. Souhaitez-vous  en ajouter une ?</span>
      </div> }
  
      {/* <p style={{margin:'10px',color: 'rgb(3, 3, 109)'}}>Distance entre la boutique et le client : {distance && distance} mètres.</p> */}
      <button style={{background:'rgb(1, 35, 138)', color:'#fff', padding:'10px 10px', margin:'20px 10px', border:'none'}} onClick={handleClick}>Envoyer la localisation</button>
    </div>
  );
};

export default Localisation;