import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import moment from 'moment';
import { Image } from 'antd';
import config from '../../config'

const VarianteProduit = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getProduit, setGetProduit] = useState([]);
    const [data, setData] = useState([]);
    const [getCouleur,setGetCouleur] = useState([]);
    const [getPays,setGetPays] = useState([]);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const id = pathname.split('/')[2];
    const [idCible,setIdcible] = useState();
    const [idFamille, setIdFamille] = useState();


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
            setGetProduit(data[0])

          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [id]);

      useEffect(()=>{
        setIdcible(getProduit?.id_cible)
        setIdFamille(getProduit?.id_famille)
      },[getProduit?.id_cible])

      console.log(idCible, idFamille)

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
        <div className="varianteProduit">
            <div className="varianteProduit-wrapper">
                <div className="varianteProduit-container-top">
                    <div className="varianteProduit-left">
                        <h2 className="varianteProduit-h2">Detail du produit</h2>
                        <span>Voir les details</span>
                    </div>
                </div>
                <div className="variant-container-bottom">
                    aaaaaaa
                </div>
            </div>
        </div>

    </>
  )
}

export default VarianteProduit