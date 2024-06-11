import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { useLocation, useNavigate } from 'react-router-dom';
import { EnvironmentOutlined, WhatsAppOutlined, UserOutlined } from '@ant-design/icons';
import L from 'leaflet';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import axios from 'axios';
import config from '../../../config';
import "leaflet/dist/leaflet.css";

const Localisation = () => {
  const DOMAINE = config.DOMAINE_SERVEUR_REACT_APP;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const idAdresse = searchParams.get('id_adresse');
  const commune = searchParams.get('commune');
  const quartier = searchParams.get('quartier');
  const avenue = searchParams.get('avenue');
  const num = searchParams.get('num');
  const adresseClient = `Kinshasa, ${commune}, ${avenue}, ${num}`;
  const [positionActuelle, setPositionActuelle] = useState(null);
  const [positionUtilisateur, setPositionUtilisateur] = useState(null);
  const [popupUtilisateurOuvert, setPopupUtilisateurOuvert] = useState(true);
  const utilisateur = useSelector((state) => state.user.currentUser.username);
  const [chargement, setChargement] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const watchPositionUtilisateur = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
        setPositionUtilisateur([latitude, longitude]);
      },
      (error) => {
        console.error('Erreur lors de la récupération de la position de l\'utilisateur :', error);
      }
    );
  
    return () => {
      navigator.geolocation.clearWatch(watchPositionUtilisateur);
    };
  }, []);

  useEffect(() => {
    const geocoderAdresse = async () => {
      if (adresseClient) {
        try {
          const reponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(positionUtilisateur)}`);
          const donnees = await reponse.json();

          if (donnees.length > 0) {
            const { lat, lon } = donnees[0];
            setPositionActuelle([parseFloat(lat), parseFloat(lon)]);
          } else {
            console.log('Aucun résultat de géocodage trouvé pour l\'adresse spécifiée.');
          }
        } catch (error) {
          console.error('Erreur lors du géocodage :', error);
        }
      }
    };

    geocoderAdresse();
  }, [adresseClient]);

  const gererClic = async (e) => {
    e.preventDefault();

    try {
      setChargement(true);
      await axios.put(`${DOMAINE}/api/client/emplacementClient/${idAdresse}`,{
        lat: latitude,
        lon: longitude
      })
      Swal.fire({
        title: 'Succès',
        text: 'Localisation enregistrée avec succès !',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      window.location.reload();
    } catch(err) {
      Swal.fire({
        title: 'Erreur',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setChargement(false);
    }
  }

  return (
    <div>
      {positionActuelle ? (
        <MapContainer center={positionUtilisateur || positionActuelle} zoom={17} scrollWheelZoom={false} style={{ height: '550px' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright"></a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {positionUtilisateur && (
            <Popup position={positionUtilisateur} autoPan={popupUtilisateurOuvert}>
              <UserOutlined style={{ fontSize: '20px', marginRight: '8px', color: 'red' }} />
              {utilisateur}
            </Popup>
          )}
          {positionActuelle && (
            <Marker position={positionActuelle} icon={L.icon({ iconUrl: 'chemin/vers/icone.png', iconSize: [20, 20] })}>
              <Popup position={positionActuelle} autoPan={popupUtilisateurOuvert}>
                <EnvironmentOutlined style={{ fontSize: '20px', marginRight: '8px', color: 'red' }} />
                {adresseClient}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      ) : (
        <div style={{ height: "95vh", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontSize: '13px' }}>
          <span style={{ textAlign: 'center' }}>Aucune localisation n'a été définie sur la carte pour ce client. Souhaitez-vous en ajouter une ?</span>
        </div>
      )}
      <button style={{ background: 'rgb(1, 35, 138)', color: '#fff', padding: '10px 10px', margin: '20px 10px', border: 'none' }} onClick={gererClic}>Envoyer la localisation</button>
    </div>
  );
};

export default Localisation;
