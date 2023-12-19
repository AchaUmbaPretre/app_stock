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
  const navigate = useNavigate();

  const handleInputChange = async (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
  
    let updatedValue = fieldValue;
  
    if (fieldName === "img") {
      const file = e.target.files[0];
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64File = reader.result;
        updatedValue = base64File;
        setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
      };
  
      reader.onerror = (error) => {
        console.error("Erreur de lecture du fichier :", error);
      };
  
      reader.readAsDataURL(file);
    } else if (fieldName === "contact_email") {
      updatedValue = fieldValue.toLowerCase();
    } else if (Number.isNaN(Number(fieldValue))) {
      updatedValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
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


  const handleClick = async (e) => {
    e.preventDefault();

    try{
      await axios.post(`${DOMAIN}/api/produit/produit`, data)
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
                      name="categorie"
                      options={getCategorie?.map(item => ({ value: item.id, label: item.nom_categorie }))}
                      onChange={selectedOption => handleInputChange({ target: { name: 'categorie', value: selectedOption.value } })}
                    />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Couleur</label>
                  <Select
                    name="categorie"
                    options={couleur?.map(item => ({ value: item.id, label: item.nom_couleur }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'couleur', value: selectedOption.value } })}
                  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Matière</label>
                  <Select
                    name='matiere'
                    options={getMatiere?.map(item => ({ value: item.id, label: item.nom }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'matiere', value: selectedOption.value } })}
                  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Pointure</label>
                  <input type="number" name='pointure' className="form-input" placeholder='ex: 40' onChange={handleInputChange}  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Quantité</label>
                  <input type="number" name='quantite_stock' className="form-input" placeholder='ex: 10' onChange={handleInputChange}  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Emplacement</label>
                  <Select
                    name="emplacement"
                    options={getData?.map(item => ({ value: item.id, label: item.nom }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'emplacement', value: selectedOption.value } })}
                  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Marque</label>
                  <Select
                    name="marque"
                    options={getMarque?.map(item => ({ value: item.id, label: item.nom }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'marque', value: selectedOption.value } })}
                  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Prix</label>
                  <input type="number" name='prix' className="form-input" placeholder='ex: 100$' onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-controle-desc">
                <label htmlFor="">Description</label>
                <textarea name="description" id="" placeholder='Description.....' onChange={handleInputChange}></textarea>
              </div>
              <div className="form-controleFile" onClick={() => document.getElementById('file-upload').click()}>
                <label htmlFor="">Image du produit</label>
                <input type="file" name='img' className="form-input" style={{display:"none"}} lable="Profil"
                  id='file-upload'
                  accept='.jpeg, .png, .jpg' onChange={handleInputChange} />
                <div className="form-file">
                  <CloudUploadOutlined className='cloud-icon' />
                  <span>Glissez et déposez un fichier à télécharger</span>
                </div>
              </div>
              { data.img &&
              <div className='form-img'>
                <img src={data.img} alt="" className='capture-img'/>
              </div>}
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

export default ProductForm