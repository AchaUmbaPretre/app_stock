import React from 'react'
import './productForm.scss'
import { CloudUploadOutlined } from '@ant-design/icons';
import { useState } from 'react';
import Select from 'react-select';
import { useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const ProductForm = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState({})
  const [getCategorie, setGetCategorie] = useState([]);
  const [getData, setGetData] = useState([]);
  const [couleur, setCouleur] = useState([]);
  const [getMatiere, setGetMatiere] = useState([]);
  const [getMarque, setGetMarque] = useState();
  const [getCible, setGetCible] = useState([]);
  const navigate = useNavigate();
  const [dateEntrant, setDateEntrant] = useState(new Date().toISOString().split('T')[0]);
  const [dateMiseAJour, setDateMiseAJour] = useState(new Date().toISOString().split('T')[0]);

  const handleInputChange = async (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
  
    let updatedValue = fieldValue;
  
    if (fieldName === "image") {
      // ...
    } else if (fieldName === "contact_email") {
      updatedValue = fieldValue.toLowerCase();
    } else if (Number.isNaN(Number(fieldValue))) {
      updatedValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
    } else if (fieldName === "date_entrant") {
      // Mettre à jour la valeur par défaut de "Date d'entrée" avec la valeur modifiée
      setDateEntrant(fieldValue);
    } else if (fieldName === "date_MisAjour") {
      // Mettre à jour la valeur par défaut de "Date de mise à jour" avec la valeur modifiée
      setDateMiseAJour(fieldValue);
    }
  
    setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/produit/categorie`);
        setGetCategorie(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/produit/emplacement`);
        setGetData(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/produit/couleur`);
        setCouleur(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/produit/matiere`);
        setGetMatiere(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/produit/marque`);
        setGetMarque(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/produit/cible`);
        setGetCible(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  const handleClick = async (e) => {
    e.preventDefault();

    if (!data.nom_produit || !data.id_categorie || !data.id_marque || !data.id_matiere || !data.prix || !data.code_variante ) {
      Swal.fire({
        title: 'Error',
        text: 'Veuillez remplir tous les champs requis',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    try{
      await axios.post(`${DOMAIN}/api/produit/produit`, {...data, date_entrant: dateEntrant, date_MisAjour: dateMiseAJour})
      Swal.fire({
        title: 'Success',
        text: 'Produit créé avec succès!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      navigate('/products')
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
        <div className="productForm">
          <div className="product-container">
            <div className="product-container-top">
              <div className="product-left">
                <h2 className="product-h2">Ajouter un produit</h2>
                <span>Créer un nouveau produit</span>
              </div>
            </div>
            <div className="product-wrapper">
              <div className="product-container-bottom">
                <div className="form-controle">
                  <label htmlFor="">Nom du produit</label>
                  <input type="text" name='nom_produit' className="form-input" placeholder='Entrer le nom...' onChange={handleInputChange} />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Catégorie</label>
                  <Select
                      name="id_categorie"
                      options={getCategorie?.map(item => ({ value: item.id_categorie, label: item.nom_categorie }))}
                      onChange={selectedOption => handleInputChange({ target: { name: 'id_categorie', value: selectedOption.value } })}
                    />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Marque</label>
                  <Select
                    name="id_marque"
                    options={getMarque?.map(item => ({ value: item.id_marque, label: item.nom }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'id_marque', value: selectedOption.value } })}
                  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Matière</label>
                  <Select
                    name='id_matiere'
                    options={getMatiere?.map(item => ({ value: item.id_matiere, label: item.nom_matiere }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'id_matiere', value: selectedOption.value } })}
                  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Cible</label>
                  <Select
                    name='matiere'
                    options={getCible?.map(item => ({ value: item.id_cible, label: item.nom_cible }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'id_cible', value: selectedOption.value } })}
                  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Prix</label>
                  <input type="number" name='prix' placeholder='ex: 10$' className="form-input" onChange={handleInputChange} />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Code variant</label>
                  <input type="text" name='code_variante' placeholder='ex: P329' className="form-input" onChange={handleInputChange} />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Date d'entrant</label>
                  <input type="date" name='date_entrant' value={dateEntrant} onChange={handleInputChange} className="form-input" />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Date de mis à jour</label>
                  <input type="date" name='date_MisAjour' value={dateMiseAJour} onChange={handleInputChange}
                   className="form-input" />
                </div>
              </div>
              <div className="form-submit">
                <button className="btn-submit" onClick={handleClick}>Soumettre</button>
                <button className="btn-submit btn-annuler">Annuler</button>
              </div>
            </div>
          </div>
        </div>
    </>
  )
}

export default ProductForm