import React, { useEffect,useState } from 'react';
import './clientForm.scss'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Select from 'react-select';
import config from '../../../config';

const ClientForm = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState({})
  const navigate = useNavigate();
  const [province, setProvince] = useState([]);
  const [idProvince, setIdProvince] = useState([]);
  const [commune, setCommune] = useState([]);

  const [deliveryAddresses, setDeliveryAddresses] = useState([{ avenue: '', quartier: '', commune: '', num:'' }]);
  const [clientInfo, setClientInfo] = useState({
    nom: '',
    raison_sociale: '',
    email: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientInfo((prevClientInfo) => ({
      ...prevClientInfo,
      [name]: value,
    }));
  };

  const handleAddressInputChange = (index, e) => {
    const { name, value } = e.target;
    const addresses = [...deliveryAddresses];
    addresses[index][name] = value;
    setDeliveryAddresses(addresses);
  };

  const addDeliveryAddress = () => {
    setDeliveryAddresses([...deliveryAddresses, { avenue: '', quartier: '', commune: '', num:'' }]);
  };

  const removeDeliveryAddress = (index) => {
    const addresses = [...deliveryAddresses];
    addresses.splice(index, 1);
    setDeliveryAddresses(addresses);
  };

/*   const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
  
    let updatedValue = fieldValue;
  
    if (fieldName === "email") {
      updatedValue = fieldValue.toLowerCase();
    } else if (Number.isNaN(Number(fieldValue))) {
      updatedValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
    }
  
  setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
  }; */

  const handleClick = async (e) => {
    e.preventDefault();

    
     if (!data.nom || !data.raison_sociale || !data.telephone || !data.id_province || !data.avenue || !data.quartier) {
      Swal.fire({
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs requis',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    } 

    try{
      await axios.post(`${DOMAIN}/api/client/client`, data)
      Swal.fire({
        title: 'Success',
        text: 'Client crée avec succès!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate('/clients')
      window.location.reload();

    }catch(err) {
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/livreur/province`);
        setProvince(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN]);

  useEffect(()=>{
    setIdProvince(data?.id_province)
  },[data?.id_province])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/livreur/commune/${idProvince}`);
        setCommune(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN,idProvince]);
  
  return (
    <>
        <div className="clientForm">
      <div className="product-container">
        <div className="product-container-top">
          <div className="product-left">
            <h2 className="product-h2">Ajouter un nouveau client</h2>
            <span>Créer un nouveau client</span>
          </div>
        </div>
        <div className="product-wrapper">
          <div className="product-container-bottom">
            <div className="form-controle">
              <label htmlFor="">Nom</label>
              <input
                type="text"
                name="nom"
                className="form-input"
                value={clientInfo.nom}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-controle">
              <label htmlFor="">Raison sociale</label>
              <select
                className="form-input"
                name="raison_sociale"
                value={clientInfo.raison_sociale}
                onChange={handleInputChange}
                required
              >
                <option value="" disabled selected>
                  Selectionnez une raison sociale
                </option>
                <option value="Client VIP">client VIP</option>
                <option value="Client Normal">client Normal</option>
              </select>
            </div>
            <div className="form-controle">
              <label htmlFor="">Email</label>
              <input
                type="email"
                name="email"
                className="form-input"
                value={clientInfo.email}
                onChange={handleInputChange}
              />
            </div>

            {/* Champs d'adresse de livraison dynamiques */}
            {deliveryAddresses.map((address, index) => (
              <div key={index}>
                <div className="form-controle">
                  <label htmlFor="">Avenue</label>
                  <input
                    type="text"
                    name={`avenue-${index}`}
                    className="form-input"
                    value={address.avenue}
                    onChange={(e) => handleAddressInputChange(index, e)}
                  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Quartier</label>
                  <input
                    type="text"
                    name={`quartier-${index}`}
                    className="form-input"
                    value={address.quartier}
                    onChange={(e) => handleAddressInputChange(index, e)}
                  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Commune</label>
                  <input
                    type="text"
                    name={`commune-${index}`}
                    className="form-input"
                    value={address.commune}
                    onChange={(e) => handleAddressInputChange(index, e)}
                  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">N°</label>
                  <input
                    type="text"
                    name={`num-${index}`}
                    className="form-input"
                    value={address.num}
                    onChange={(e) => handleAddressInputChange(index, e)}
                  />
                </div>
                {index > 0 && (
                  <div className="form-controle">
                    <button type="button" className="remove-btn" onClick={() => removeDeliveryAddress(index)}>
                      Supprimer
                    </button>
                  </div>
                )}
              </div>
            ))}

            <div className="form-controle">
              <button type="button" className="add-btn" onClick={addDeliveryAddress} style={{border:'none', marginTop: "20px"}}>
                Ajouter une adresse de livraison
              </button>
            </div>

            <div className="form-submit">
              <button className="btn-submit" onClick={handleClick}>
                Soumettre
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  )
}

export default ClientForm