import React from 'react'
import { CloudUploadOutlined  } from '@ant-design/icons';
import { useState } from 'react';
import Select from 'react-select';
import { useEffect } from 'react';
import axios from 'axios';
import config from '../../../config';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';

const FormProduitEdit = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState({})
  const [getCategorie, setGetCategorie] = useState([]);
  const [getData, setGetData] = useState([]);
  const [couleur, setCouleur] = useState([]);
  const [getMatiere, setGetMatiere] = useState([]);
  const [getMarque, setGetMarque] = useState();
  const {pathname} = useLocation();
  const id = pathname.split('/')[2]
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);


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
      await axios.put(`${DOMAIN}/api/produit/produit/${id}`, data)
      Swal.fire({
        title: 'Success',
        text: 'Le produit a été modifié avec succès.!',
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/produit/produitView/${id}`);
        setData(data[0]);
        setIsEditing(true)
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  

  return (
    <>
        <div className="productForm">
          <div className="product-container">
            <div className="product-container-top">
              <div className="product-left">
                <h2 className="product-h2">Modifier un produit</h2>
              </div>
            </div>
            <div className="product-wrapper">
              <div className="product-container-bottom">
                <div className="form-controle">
                  <label htmlFor="">Nom du produit</label>
                  <input type="text" name='nom_produit' value={data?.nom_produit} className="form-input" placeholder='Entrer le nom...' onChange={handleInputChange} />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Catégorie</label>
                  <select
                    value={data?.categorie}
                    name="categorie"
                    placeholder="Sélectionnez une couleur"
                    className="form-input"
                    onChange={handleInputChange}
                    >
                        <option value="">Sélectionnez une categorie</option>
                            {getCategorie?.map((item) => (
                        <option key={item.id} value={item.id}>{item.nom_categorie }</option>
                            ))}
                    </select>
                </div>
                <div className="form-controle">
                  <label htmlFor="">Couleur</label>
                    <select
                    value={data?.couleur }
                    name="couleur"
                    placeholder="Sélectionnez une couleur"
                    className="form-input"
                    onChange={handleInputChange}
                    >
                        <option value="">Sélectionnez une couleur</option>
                            {couleur?.map((item) => (
                        <option key={item.id} value={item.id}>{item.nom_couleur }</option>
                            ))}
                    </select>
                </div>
                <div className="form-controle">
                  <label htmlFor="">Matière</label>
                  <select
                    value={data?.matiere }
                    name='matiere'
                    placeholder="Sélectionnez une Matière"
                    className="form-input"
                    onChange={handleInputChange}
                    >
                        <option value="">Sélectionnez une matière</option>
                            {getMatiere?.map((item) => (
                        <option key={item.id} value={item.id}>{item.nom }</option>
                            ))}
                    </select>
                </div>
                <div className="form-controle">
                  <label htmlFor="">Pointure</label>
                  <input type="number" name='pointure' value={data?.pointure ?? ''} className="form-input" placeholder='ex: 40' onChange={handleInputChange}  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Quantité</label>
                  <input type="number" name='quantite_stock' value={data?.quantite_stock ?? ''} className="form-input" placeholder='ex: 10' onChange={handleInputChange}  />
                </div>
                <div className="form-controle">
                  <label htmlFor="">Emplacement</label>
                    <select
                    value={data?.emplacement }
                    name="emplacement"
                    placeholder="Sélectionnez un emplacement"
                    className="form-input"
                    onChange={handleInputChange}
                    >
                        <option value="">Sélectionnez un emplacement</option>
                            {getData?.map((item) => (
                        <option key={item.id} value={item.id}>{item.nom }</option>
                            ))}
                    </select>
                  
                </div>
                <div className="form-controle">
                  <label htmlFor="">Marques</label>
                    <select
                    value={data?.marque}
                    name="marque"
                    placeholder="Sélectionnez une marque"
                    className="form-input"
                    onChange={handleInputChange}
                    >
                        {getMarque?.map((item) => (
                        <option key={item.id} value={item.id}>{item.nom}</option>
                            ))}
                    </select>
                </div>
                <div className="form-controle">
                  <label htmlFor="">Prix</label>
                  <input type="number" name='prix' value={data?.prix ?? ''}  className="form-input" placeholder='ex: 100$' onChange={handleInputChange} />
                </div>
              </div>
              <div className="form-controle-desc">
                <label htmlFor="">Description</label>
                <textarea name="description" id="" value={data?.description ?? ''}  placeholder='Description.....' onChange={handleInputChange}></textarea>
              </div>
              <div className="form-controleFile" onClick={() => document.getElementById('file-upload').click()}>
                <label htmlFor="">Image du produit</label>
                <input type="file" name='img'  className="form-input" style={{display:"none"}} lable="Profil"
                  id='file-upload'
                  accept='.jpeg, .png, .jpg' onChange={handleInputChange} />
                <div className="form-file">
                  <CloudUploadOutlined className='cloud-icon' />
                  <span>Glissez et déposez un fichier à télécharger</span>
                </div>
              </div>
              { data?.img &&
              <div className='form-img'>
                <img src={data?.img} alt="" className='capture-img'/>
              </div>}
              <div className="form-submit">
                <button className="btn-submit" onClick={handleClick}>Modifier</button>
                <button className="btn-submit btn-annuler">Annuler</button>
              </div>
            </div>
          </div>
        </div>

    </>
  )
}

export default FormProduitEdit