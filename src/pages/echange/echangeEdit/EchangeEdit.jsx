import React from 'react'
import { useState } from 'react';
import Select from 'react-select';
import { useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const EchangeEdit = ({getEchange, setGetEchange}) => {
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
    setGetEchange((prev) => ({ ...prev, [fieldName]: updatedValue }));
  };
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
        const { data } = await axios.get(`${DOMAIN}/api/peuple`);
        setClient(data);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
        <div className="retourForm">
          <div className="product-container">
            <div className="product-wrapper">
              <div className="product-container-bottom">
                <div className="form-controle">
                    <label htmlFor="">Client</label>
                    <select
                        value={getEchange?.client_id }
                        name="client_id"
                        className="form-input"
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>Sélectionnez un client</option>
                            {client?.map((item) => (
                        <option key={item.id} value={item.id}>{item.nom }</option>
                            ))}
                    </select>
                </div>
                <div className="form-controle">
                    <label htmlFor="">Produit</label>
                    <select
                        value={getEchange?.produit_id}
                        name='produit_id'
                        className="form-input"
                        onChange={handleInputChange}
                    >
                        <option disabled>Sélectionnez un produit</option>
                            {produit?.map((item) => (
                        <option key={item.id} value={item.produit_id}>{item.nom_produit }</option>
                            ))}
                    </select>
                </div>
                <div className="form-controle">
                  <label htmlFor="">Quantité</label>
                  <input type="number" name='quantite' value={getEchange?.quantite} className="form-input" placeholder='ex: 2' onChange={handleInputChange}  />
                </div>
                <div className="form-controle">
                    <label htmlFor="">Produit d'échange</label>
                    <select
                        value={getEchange?.produit_echange_id}
                        name="produit_echange_id"
                        className="form-input"
                        onChange={handleInputChange}
                    >
                        <option disabled>Sélectionnez un produit</option>
                            {produit?.map((item) => (
                        <option key={item.id} value={item.produit_id}>{`${item.nom_produit} de couleur ${item.couleur}` }</option>
                            ))}
                    </select>
                </div>
              </div>
            </div>
          </div>
        </div>

    </>
  )
}

export default EchangeEdit