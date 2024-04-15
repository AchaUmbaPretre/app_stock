import React from 'react'
import { useState } from 'react';
import Select from 'react-select';
import { useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const EchangeForm = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState({})
  const [getCategorie, setGetCategorie] = useState([]);
  const [client, setClient] = useState([]);
  const [produit, setProduit] = useState([]);
  const [loading, setLoading] = useState([]);
  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
  
    let updatedValue = fieldValue;
  
    if (fieldName === "img") {
    } else if (Number.isNaN(Number(fieldValue))) {
      updatedValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
    }
  
    setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
  };

  console.log(data)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/produit`);
        setProduit(data);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/commande`);
        setData(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  
    const timeoutId = setTimeout(fetchData, 4000);
  
    return () => clearTimeout(timeoutId);
  }, [DOMAIN]);

  const handleClick = async (e) => {
    e.preventDefault();

    try{
      await axios.post(`${DOMAIN}/api/vente/echange`, data)
      Swal.fire({
        title: 'Success',
        text: 'Retour créé avec succès!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      navigate('/echange')
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
        <div className="retourForm">
          <div className="product-container">
            <div className="product-container-top">
              <div className="product-left">
                <h2 className="product-h2">Ajouter un échange</h2>
                <span>Créer un nouveau échange</span>
              </div>
            </div>
            <div className="product-wrapper">
              <div className="product-container-bottom">
                <div className="form-controle">
                  <label htmlFor="">Commande</label>
                  <Select
                    name="id_commande"
                    options={data?.map(item => ({ value: item.id, label: item.nom + " Commande N° "+item.id_commande }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'id_commande', value: selectedOption.value } })}
                  />
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

export default EchangeForm