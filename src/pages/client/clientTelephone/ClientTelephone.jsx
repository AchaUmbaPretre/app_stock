import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import config from '../../../config';
import { CircularProgress } from '@mui/material';
import './clientTelephone.scss'

const ClientTelephone = ({idClients}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState({})
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
  
    let updatedValue = fieldValue;
  
    if (fieldName === "email") {
      updatedValue = fieldValue.toLowerCase();
    } else if (fieldName === "telephone") {
      updatedValue = fieldValue.replace(/[^0-9+]/g, '');
    } else if (fieldValue && Number.isNaN(Number(fieldValue))) {
      updatedValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
    }
  
    setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    
     if (!data) {
      Swal.fire({
        title: 'Erreur',
        text: 'Veuillez remplir tous les champs requis',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    } 

    try{
      setIsLoading(true);
      await axios.post(`${DOMAIN}/api/client/clientTelephone`,{
        ...data,
        id_client : idClients
      })
      Swal.fire({
        title: 'Success',
        text: 'Un nouveau a été ajouté avec succès!',
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
    finally {
      setIsLoading(false);
    }
  }
  
  return (
    <>
        <div className="clientFormTel">
          <div className="product-container">
            <div className="product-wrapper" >
              <div className="product-container-bottom">
                <div className="form-controle" >
                  <label htmlFor="">Telephone <span style={{color:'red'}}>*</span></label>
                  <input type="text" name="numero" className="form-input" placeholder='+243' onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-submit">
                <button className="btn-submit" onClick={handleClick} disabled={isLoading}>Envoyer</button>
                {isLoading && (
                <div className="loader-container loader-container-center">
                  <CircularProgress size={28} />
                </div>
            )}
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default ClientTelephone