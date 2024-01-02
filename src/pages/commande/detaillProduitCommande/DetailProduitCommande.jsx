import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Select from 'react-select';
import './detailProduitCommande.scss'
import { FadeLoader } from 'react-spinners';
import config from '../../../config'


const DetailProduitCommande = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const id = pathname.split('/')[2];
    const [famille, setFamille] = useState(null);
    const [marque, setMarque] = useState(null);
    const [cible, setCible] = useState(null);
    const [loading, setLoading] = useState(true);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/varianteFiltreCible/${cible}`);
            setLoading(false)
            setData(data)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [cible]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get( famille ? `${DOMAIN}/api/produit/varianteFiltre/${famille}`: `${DOMAIN}/api/produit/varianteProduit`);
            setData(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [famille]);

      
  return (
    <>
        <div className="detailProduitCommande">
        { loading ? (
              <div className="spinner-container">
                <FadeLoader color={'#36D7B7'} loading={loading} />
              </div>
            ) : (
              <div className="detailProduit-wrapper">
                <div className="detailProduit-container-top">
                    <div className="detailProduit-left">
                        <h2 className="detailProduit-h2">Detail du produit commande</h2>
                        <span>Voir les details du produit</span>
                    </div>
                </div>
                <div className="variant-container-bottom">

                </div>
            </div>
            )}
        </div>

    </>
  )
}

export default DetailProduitCommande