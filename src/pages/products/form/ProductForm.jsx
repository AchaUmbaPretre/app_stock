import React from 'react'
import './productForm.scss'
import { useState } from 'react';
import Select from 'react-select';
import { useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import Swal from 'sweetalert2';
import { CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductForm = ({fetchData, closeOpen}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState({})
  const [getCategorie, setGetCategorie] = useState([]);
  const [getMatiere, setGetMatiere] = useState([]);
  const [getMarque, setGetMarque] = useState();
  const [getCible, setGetCible] = useState([]);
  const [getEtatProduit, setGetEtatProduit] = useState("Actif");
  const navigate = useNavigate();
  const [variantCheck, setVariantCheck] = useState({});
  const [dateEntrant, setDateEntrant] = useState(new Date().toISOString().split('T')[0]);
  const [dateMiseAJour, setDateMiseAJour] = useState(new Date().toISOString().split('T')[0]);
  const [variantExists, setVariantExists] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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
     
     // Vérifier si la variante existe déjà
     if (fieldName === "code_variante") {
      const exists = variantCheck.some(
        (variant) => variant.code_variante.toLowerCase() === fieldValue.toLowerCase()
      );
      setVariantExists(exists);
    }
  
    setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
  };

  const handleInputChange1 = async (e) => {
    setGetEtatProduit( e.target.value );
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
  }, [DOMAIN]);

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
  }, [DOMAIN]);

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
  }, [DOMAIN]);

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
  }, [DOMAIN]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/produit/CodevarianteProduit`);
        setVariantCheck(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN]);


  const handleClick = async (e) => {
    e.preventDefault();

    if (!data.nom_produit || !data.id_categorie || !data.id_marque || !data.id_matiere || !data.prix || !data.code_variante || !getEtatProduit) {
      Swal.fire({
        title: 'Error',
        text: 'Veuillez remplir tous les champs requis',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    try{
      setIsLoading(true);
      await axios.post(`${DOMAIN}/api/produit/produit`, {...data, date_entrant: dateEntrant, date_MisAjour: dateMiseAJour, etatProduit: getEtatProduit})
      Swal.fire({
        title: 'Success',
        text: 'Produit créé avec succès!',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      fetchData();
      closeOpen();

/*       navigate('/products')
      window.location.reload(); */

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
                  <label htmlFor="">Nom du produit <span style={{color:'red'}}>*</span></label>
                  <input type="text" name='nom_produit' className="form-input" placeholder='Entrer le nom...' onChange={handleInputChange} />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Catégorie <span style={{color:'red'}}>*</span></label>
                  <Select
                      name="id_categorie"
                      options={getCategorie?.map(item => ({ value: item.id_categorie, label: item.nom_categorie }))}
                      onChange={selectedOption => handleInputChange({ target: { name: 'id_categorie', value: selectedOption.value } })}
                    />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Marque <span style={{color:'red'}}>*</span></label>
                  <Select
                    name="id_marque"
                    options={getMarque?.map(item => ({ value: item.id_marque, label: item.nom }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'id_marque', value: selectedOption.value } })}
                  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Matière <span style={{color:'red'}}>*</span></label>
                  <Select
                    name='id_matiere'
                    options={getMatiere?.map(item => ({ value: item.id_matiere, label: item.nom_matiere }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'id_matiere', value: selectedOption.value } })}
                  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Cible <span style={{color:'red'}}>*</span></label>
                  <Select
                    name='matiere'
                    options={getCible?.map(item => ({ value: item.id_cible, label: item.nom_cible }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'id_cible', value: selectedOption.value } })}
                  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Prix <span style={{color:'red'}}>*</span></label>
                  <input type="number" name='prix' placeholder='ex: 10$' className="form-input" onChange={handleInputChange} />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Code variant <span style={{color:'red'}}>*</span></label>
                  <input type="text" name='code_variante' placeholder='ex: P329' className="form-input" onChange={handleInputChange} />
                  {variantExists && <p className="error-message" style={{color:"red", fontSize:"13px"}}>Cette variante existe déjà.</p>}
                </div>
                <div className="form-controle">
                  <label htmlFor="">Date d'entrant <span style={{color:'red'}}>*</span></label>
                  <input type="date" name='date_entrant' value={dateEntrant} onChange={handleInputChange} className="form-input" />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Date de mis à jour <span style={{color:'red'}}>*</span></label>
                  <input type="date" name='date_MisAjour' value={dateMiseAJour} onChange={handleInputChange}
                   className="form-input" />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Etat du produit <span style={{color:'red'}}>*</span></label>
                  <div className='form-radio'>
                    <input type="radio" id="Actif" name="etatProduit" value="Actif" checked={getEtatProduit === 'Actif'} onChange={handleInputChange1}/>
                    <label for="Actif">Actif</label>
                  </div>
                  <div className='form-radio'>
                    <input type="radio" id="Passif" name="etatProduit" value="Passif" checked={getEtatProduit === 'Passif'} onChange={handleInputChange1}/>
                    <label for="Passif">Passif</label>
                  </div>
                </div>
              </div>
              
              <div className="form-submit">
                <button className="btn-submit" onClick={handleClick} disabled={isLoading}>Soumettre</button>
                <button className="btn-submit btn-annuler" onClick={()=> window.location.reload()}>Annuler</button>
                {isLoading && (
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

export default ProductForm