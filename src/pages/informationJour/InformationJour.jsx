import React, { useEffect, useState } from 'react'
import './informationJour.scss'
import axios from 'axios';
import config from '../../config';

const InformationJour = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const [commande, setCommande] = useState([]);
    


    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/vente/venteDuJour`);
            setData(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/commande/commandeJour`);
            setCommande(data);
          } catch (error) {
            console.log(error);
          }
        };
    
        fetchData();
      
        const timeoutId = setTimeout(fetchData, 4000);
      
        return () => clearTimeout(timeoutId);
      }, [DOMAIN]);


  return (
    <>
        <div className='informationJour'>
            <div className="info-row">
                <span>Nbre de vente : </span>
                <span>{data[0]?.total_varianteproduit === undefined ? 0 : data[0]?.total_varianteproduit }</span>
            </div>
            <div className="info-row">
                <span>Nbre de commande : </span>
                <span>{commande[0]?.nbre === undefined ? 0 : commande[0]?.nbre}</span>
            </div>
            <div className="info-row">
                <span>Nbre de livraison : </span>
                <span>10</span>
            </div>
        </div>

    </>
  )
}

export default InformationJour