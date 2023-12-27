import React, { useState } from 'react'
import Select from 'react-select';
import { useEffect } from 'react';
import config from '../../../config';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const FormMouvement = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [selectionType, setSelectionType] = useState('checkbox');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
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
    
    setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
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

    const handleClick = async (e) => {
      e.preventDefault();
  
      try{
        await axios.post(`${DOMAIN}/api/vente/vente`, data)
        Swal.fire({
          title: 'Success',
          text: 'Vente crée avec succès!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigate('/ventes')
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
                <h2 className="product-h2">Ajouter un nouveau mouvement</h2>
                <span>Créer un nouveau mouvement</span>
              </div>
            </div>
            <div className="product-wrapper">
              <div className="product-container-bottom">
                <div className="form-controle">
                  <label htmlFor="">Client</label>
                  <Select
                    name='id_client'
                    options={client?.map(item => ({ value: item.id, label: item.nom }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'client_id', value: selectedOption.value } })}
                  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Type de mouvement</label>
                  <Select
                    name='id_type_mouvement '
                    options={livreur?.map(item => ({ value: item.id_type_mouvement , label: item.nom_type }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'id_type_mouvement ', value: selectedOption.value } })}
                  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Produit</label>
                  <Select
                    name='id_varianteproduit '
                    options={produit?.map(item => ({ value: item.id_varianteproduit , label: item.nom_produit }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'id_varianteproduit ', value: selectedOption.value } })}
                  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Quantité</label>
                  <input type="number" className="form-input" name='quantite' onChange={handleInputChange} placeholder='ex: 10'  required/>
                </div>
                <div className="form-controle">
                  <label htmlFor="">Description</label>
                  <textarea type="text" className="form-input form-desc" name='description' placeholder='Ecrire la description' onChange={handleInputChange}  required/>
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

export default FormMouvement