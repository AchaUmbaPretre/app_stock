import React from 'react'
import './productView.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import config from '../../../config'
import axios from 'axios'
import { useEffect } from 'react'
import { format } from 'date-fns'
import moment from 'moment';
import { Image } from 'antd';

const ProductView = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getProduit, setGetProduit] = useState([]);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const id = pathname.split('/')[2]

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/produitView/${id}`);
            setGetProduit(data[0]);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [id]);

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
                                <th scope="row">Pointure</th>
                                <td>{getProduit?.pointure}</td>
                            </tr>
                            <tr>
                                <th scope="row">Couleur</th>
                                <td>{getProduit?.nom_couleur}</td>
                            </tr>
                            <tr>
                                <th scope="row">Quantité</th>
                                <td>{getProduit?.quantite_stock}</td>
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
                                <th scope="row">Emplacement</th>
                                <td>{getProduit?.nom_emplacement}</td>
                            </tr>
                            <tr>
                                <th scope="row">Date d'entrée</th>
                                <td>{formattedDatEntrant}</td>
                            </tr>
                            <tr>
                                <th scope="row">Statut</th>
                                <td>{getProduit?.statut}</td>
                            </tr>
                            <tr>
                                <th scope="row">Description</th>
                                <td>{getProduit?.description}</td>
                            </tr>
                        </table>
                    </div>
                    <div className="product-view-right">
                        <h2 className="product-h2">L'image du produit {getProduit?.nom_produit}</h2>
                        <div className="product-img-row">
                            <Image
                                className="product-img"
                                width={200}
                                height={200}
                                src="error"
                                fallback={getProduit?.img}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default ProductView