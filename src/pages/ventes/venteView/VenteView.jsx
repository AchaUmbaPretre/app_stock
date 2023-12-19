import React, { useEffect, useState } from 'react'
import './venteView.scss'
import { useLocation } from 'react-router-dom';
import config from '../../../config';
import axios from 'axios';

const VenteView = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [getVente, setGetVente] = useState([]);
  const {pathname} = useLocation();
  const id = pathname.split('/')[2]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/vente/venteOne/${id}`);
        setGetVente(data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);
  return (
    <>
        <div className="venteView">
            <div className="venteView-wrapper">
                <div className="venteView-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Detail de vente</h2>
                        <span>Voir le détail</span>
                    </div>
                </div>
                <div className="venteView-container-bottom">


                </div>
            </div>
        </div>
    </>
  )
}

export default VenteView