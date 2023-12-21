import React from 'react'
import './productView.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import config from '../../../config'
import axios from 'axios'
import { useEffect } from 'react'
import Select from 'react-select';
import { format } from 'date-fns'
import moment from 'moment';
import { Image } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';

const ProductView = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getProduit, setGetProduit] = useState([]);
    const [data, setData] = useState([]);
    const [getCouleur,setGetCouleur] = useState([]);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]


    const handleInputChange = async (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
      
        let updatedValue = fieldValue;
      
        if (fieldName === "image") {
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
            const { data } = await axios.get(`${DOMAIN}/api/produit/produit/${id}`);
            setGetProduit(data[0]);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [id]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/couleur`);
            setGetCouleur(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

      const formattedDatEntrant = moment(getProduit?.date_entree).format('DD-MM-YYYY');

  return (
    <>
        <div className="productView">
            <div className="product-wrapper">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Detail du produit</h2>
                        <span>Voir les details</span>
                    </div>
                </div>
                <div className="product-bottom">
                    <div className="product-view-left">
                        <table>
                            <tr>
                                <th scope="col">Titre</th>
                                <th scope="col">Détail</th>
                            </tr>
                            <tr>
                                <th scope="row">Produit</th>
                                <td>{getProduit?.nom_produit}</td>
                            </tr>
                            <tr>
                                <th scope="row">Catégorie</th>
                                <td>{getProduit?.nom_categorie}</td>
                            </tr>
                            <tr>
                                <th scope="row">Matière</th>
                                <td>{getProduit?.nom_matiere}</td>
                            </tr>
                            <tr>
                                <th scope="row">Prix</th>
                                <td>{getProduit?.prix} $</td>
                            </tr>
                            <tr>
                                <th scope="row">Marque</th>
                                <td>{getProduit?.nom_marque}</td>
                            </tr>
                            <tr>
                                <th scope="row">Famille</th>
                                <td>{getProduit?.nom_famille}</td>
                            </tr>
                            <tr>
                                <th scope="row">Date d'entrée</th>
                                <td>{formattedDatEntrant}</td>
                            </tr>
                        </table>
                        <div className="product_view_form">
                            <h2 className="product-h2">Ajoutez des informations</h2>
                            <div className="product_view_wrapper">
                                <div className="produit-view-control">
                                    <label htmlFor="">Taille</label>
                                    <input type="number" className="produit_input" />
                                </div>
                                <div className="produit-view-control">
                                    <label htmlFor="">Couleur</label>
                                    <Select
                                        name="id_couleur"
                                        placeholder="sélectionnez une couleur"
                                        options={getCouleur?.map(item => ({ value: item.id_couleur, label: item.description }))}
                                        onChange={selectedOption => handleInputChange({ target: { name: 'id_couleur', value: selectedOption.value } })}
                                    />
                                </div>
                                <div className="produit-view-control">
                                    <label htmlFor="">Stock</label>
                                    <input type="number" className="produit_input" placeholder='Entrez la quantité du produit' />
                                </div>
                                <div className="produit-view-control">
                                    <label htmlFor="">Prix</label>
                                    <input type="number" value={getProduit?.prix} className="produit_input" />
                                </div>
                                <div className="produit-view-control">
                                    <label htmlFor="">Code Variant</label>
                                    <input type="text" className="produit_input" />
                                </div>
                            </div>
                            <button className="produit_submit">Soumettre</button>
                        </div>
                    </div>
                    <div className="product-view-right">
                        <h2 className="product-h2">L'image</h2>
                        <div className="product-img-row" onClick={() => document.getElementById('file-upload').click()}>
{/*                             <Image
                                className="product-img"
                                width={200}
                                height={200}
                                src="error"
                                fallback={getProduit?.img}
                            /> */}
                            <input type="file" name='image' className="form-input" style={{display:"none"}} lable="Profil"
                            id='file-upload'
                            accept='.jpeg, .png, .jpg' onChange={handleInputChange}/>
                            <div className="form-file">
                                <CloudUploadOutlined className='cloud-icon' />
                                <span>Glissez et déposez un fichier à télécharger</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default ProductView