import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'
import config from '../../../config';

const LivreurForm = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState({})
  const navigate = useNavigate();

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
      await axios.post(`${DOMAIN}/api/peuple/livreur`, data)
      Swal.fire({
        title: 'Success',
        text: 'Livreur crée avec succès!',
        icon: 'success',
        confirmButtonText: 'OK',
      });
      navigate('/livreur')
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

  return (
    <>
        <div className="clientForm">
          <div className="product-container">
            <div className="product-container-top">
              <div className="product-left">
                <h2 className="product-h2">Ajouter un nouveau livreur</h2>
                <span>Créer un nouveau livreur</span>
              </div>
            </div>
            <div className="product-wrapper">
              <div className="product-container-bottom">
                <div className="form-controle">
                  <label htmlFor="">Nom</label>
                  <input type="text" className="form-input" name='nom' onChange={handleInputChange} required/>
                </div>
                <div className="form-controle">
                  <label htmlFor="">Prenom</label>
                  <input type="text" className="form-input" name='prenom' onChange={handleInputChange} required/>
                </div>
                <div className="form-controle">
                  <label htmlFor="">Numero</label>
                  <input type="email" className="form-input" name='numero' onChange={handleInputChange} />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Adresse</label>
                  <input type="text" className="form-input" name='adresse' onChange={handleInputChange}/>
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

export default LivreurForm