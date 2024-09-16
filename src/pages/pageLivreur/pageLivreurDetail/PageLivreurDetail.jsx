import React, { useEffect, useState } from 'react';
import './pageLivreurDetail.scss';
import { useLocation } from 'react-router-dom';
import config from '../../../config';
import axios from 'axios';
import moment from 'moment';
import { FadeLoader } from 'react-spinners';

const PageLivreurDetail = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const { pathname } = useLocation();
  const id = pathname.split('/')[2];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${DOMAIN}/api/livraison/livraison-user-detail/${id}`);
        setData(response.data[0]);
      } catch (error) {
        console.error('Erreur lors de la récupération des données :', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [DOMAIN, id]);

  return (
    <div className="pageLivreurDetail">
      {loading ? (
        <div className="spinner-container">
          <FadeLoader color={'#36D7B7'} loading={loading} />
        </div>
      ) : (
        <div className="pageLivreurDetail-wrapper">
          {data.img ? (
            <img src={`${DOMAIN}${data.img}`} alt="Livreur" className="img-page-livreur" />
          ) : (
            <div className="img-placeholder">Image non disponible</div>
          )}
          <div className="pageLivreurDetail-rows">
            <span className="pageLivreur-name"><span className="pageLivreur-sous-nom">Créé par : </span>{data.username}</span>
            <span className="pageLivreur-name"><span className="pageLivreur-sous-nom">Marque : </span>{data.nom}</span>
            <span className="pageLivreur-name"><span className="pageLivreur-sous-nom">Pointure : </span>{data.taille}</span>
            <span className="pageLivreur-name"><span className="pageLivreur-sous-nom">Quantité à livrer : </span>{data.qte_livre}</span>
            <span className="pageLivreur-name"><span className="pageLivreur-sous-nom">Prix : </span>{data.prix} $</span>
            <span className="pageLivreur-name"><span className="pageLivreur-sous-nom">Date de création : </span>{moment(data.date_creation).format('DD/MM/YYYY')}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PageLivreurDetail;
