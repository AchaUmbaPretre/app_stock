import React, { useState } from 'react'
import Select from 'react-select';
import { useEffect } from 'react';
import config from '../../../config';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const FormVenteEdit = ({getVente,setGetVente}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [client, setClient] = useState([]);
    const [livreur, setLivreur] = useState([]);
    const [produit, setProduit] = useState([]);
    

    const handleInputChange = (e) => {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
    
      let updatedValue = fieldValue;
    
      if (fieldName === "contact_email") {
        updatedValue = fieldValue.toLowerCase();
      } else if (Number.isNaN(Number(fieldValue))) {
        updatedValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
      }
    
      setGetVente((prev) => ({ ...prev, [fieldName]: updatedValue }));
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

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`${DOMAIN}/api/peuple/livreur`);
          setLivreur(data);
          setLoading(false)
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
            <div className="product-wrapper">
              <div className="product-container-bottom">
                <div className="form-controle">
                  <label htmlFor="">Client</label>
                  <select
                    value={getVente?.nom_client }
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
                  <label htmlFor="">Livreur</label>
                    <select
                        value={getVente?.nom }
                        name='livreur_id'
                        className="form-input"
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>Sélectionnez un client</option>
                            {livreur?.map((item) => (
                        <option key={item.id} value={item.id}>{item.nom }</option>
                            ))}
                    </select>
                </div>
                <div className="form-controle">
                  <label htmlFor="">Produit</label>
                  <select
                        value={getVente?.nom }
                        name='produit_id'
                        className="form-input"
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>Sélectionnez un produit</option>
                            {produit?.map((item) => (
                        <option key={item.id} value={item.produit_id}>{item.nom_produit }</option>
                            ))}
                    </select>
                </div>
                <div className="form-controle">
                  <label htmlFor="">Quantité</label>
                  <input type="number" value={getVente?.quantite} className="form-input" name='quantite' onChange={handleInputChange} placeholder='ex: 10'  required/>
                </div>
                <div className="form-controle">
                  <label htmlFor="">Prix unitaire</label>
                  <input type="number" value={getVente?.prix_unitaire} className="form-input" name='prix_unitaire' placeholder='ex: 100$' onChange={handleInputChange}  required/>
                </div>
            </div>
          </div>
        </div>
        </div>
    </>
  )
}

export default FormVenteEdit