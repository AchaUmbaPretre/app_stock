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

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
  
    let updatedValue = fieldValue;
  
    if (fieldName === "contact_email") {
      updatedValue = fieldValue.toLowerCase();
    } else if (Number.isNaN(Number(fieldValue))) {
      updatedValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
    }
  
  setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try{
      await axios.post(`${DOMAIN}/api/peuple/client`, data)
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
        const { data } = await axios.get(`${DOMAIN}/api/peuple/province`);
        setProvince(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
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
                  <input type="text" name='nom' className="form-input" onChange={handleInputChange}  required/>
                </div>
                <div className="form-controle">
                  <label htmlFor="">Raison sociale</label>
                  <select id="" className="form-input" name="raison_sociale" onChange={handleInputChange} required>
                    <option value="" disabled>Selectionnez une raison sociale</option>
                    <option value="Client VIP">client VIP</option>
                    <option value="Client Normal">client Normal</option>
                  </select>
                </div>
                <div className="form-controle">
                  <label htmlFor="">Email</label>
                  <input type="email" name='email' className="form-input" onChange={handleInputChange} />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Telephone</label>
                  <input type="tel" name='telephone' className="form-input" onChange={handleInputChange} required />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Ville</label>
                  <Select
                    name="ville"
                    options={province?.map(item => ({ value: item.id, label: item.nom }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'ville', value: selectedOption.value } })}
                  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Adresse</label>
                  <input type="text" name="adresse" className="form-input" onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-submit">
                <button className="btn-submit" onClick={handleClick}>Soumetre</button>
                <button className="btn-submit btn-annuler">Annuler</button>
              </div>
            </div>
          </div>
        </div>

    </>
  )
}

export default ClientForm