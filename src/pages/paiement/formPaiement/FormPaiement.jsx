import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import Swal from 'sweetalert2';
import Select from 'react-select';
import { CircularProgress } from '@mui/material';

const FormPaiement = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [getClient, setGetClient] = useState([]);

  const handleInputChange = async (e) => {
    const fieldName = e.target.name;
    let fieldValue = e.target.value;
  
    let updatedValue = fieldValue;
  
    if (fieldName === "contact_email") {
      updatedValue = fieldValue.toLowerCase();
    } else if (Number.isNaN(Number(fieldValue))) {
      if (fieldValue) {
        updatedValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
      }
    }
  
    setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try{
        setLoading(true);
      await axios.post(`${DOMAIN}/api/vente/vente/paiement`,data)
      Swal.fire({
        title: 'Success',
        text: 'La categorie de dépenses a été enregistrée avec succès.!',
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
        setLoading(false);
      }
  }

  console.log(data)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/commande`);
        setGetClient(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [DOMAIN]);
  

  return (

    <>
        <div className="formCatDepense">
          <div className="product-container">
            <div className="product-wrapper">
                <div className="form-controle-desc">
                  <label htmlFor="">Client(e)</label>
                  <Select
                    name="id_commande"
                    options={getClient?.map(item => ({ value: item.id_commande, label: `${item.nom}/ commande N°${item.id_commande}`}))}
                    onChange={selectedOption => {
                      const selectedIdCommande = selectedOption.value;
                      const selectedIdClient = getClient.find(item => item.id_commande === selectedIdCommande)?.id_client;
                      handleInputChange({ target: { name: 'id_commande', value: selectedIdCommande } });
                      handleInputChange({ target: { name: 'id_client', value: selectedIdClient } });
                    }}
                  />
                </div>
                <div className="form-controle-desc">
                  <label htmlFor="">Montant</label>
                  <input type="number" name='montant' style={{padding:'8px 10px', border:'1px solid #c5c5c5', outline:'none', borderRadius:'5px'}} min={0} onChange={handleInputChange} />
                </div>
              <div className="form-submit">
                <button className="btn-submit" onClick={handleClick}>Envoyer</button>
                <button className="btn-submit btn-annuler" onClick={()=> window.location.reload()}>Annuler</button>
                {loading && (
                <div className="loader-container loader-container-center">
                  <CircularProgress size={30} />
                </div>
            )}
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default FormPaiement