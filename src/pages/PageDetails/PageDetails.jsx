import { useLocation, useNavigate } from 'react-router-dom';
import './pageDetails.scss'
import config from '../../config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Rate } from 'antd';

const PageDetails = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getProduit, setGetProduit] = useState([]);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const id = pathname.split('/')[2];


    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/varianteDetail/${id}`);
            setData(data[0])
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [id]);


  return (
    <>
        <div className="pageDetails">
            <div className="pageDetail-wrapper">
                <div className="pageDetail-container">
                    <div className="pageDetail-left">
                        <img src={data?.image} alt="" className="pageDetail-img" />
                        <div className="pageDetail-left-wrapper">
                            <h2>Description</h2>
                            <ul>
                                <li><strong>Matière : </strong>Cuir synthétique en microfibres</li>
                                <li><strong>Marque : </strong>Polyester</li>
                                <li><strong>Couleurs : </strong>6 au choix</li>
                                <li><strong>Cible : </strong>Enfant</li>
                            </ul>

                        </div>
                    </div>
                    <div className="pageDetail-right">
                        <h2 className="pageDetail-h2">Sacs à main en cuir souple pour femmes</h2>
                        <div className="pagedetailDescr">
                            <span>Kaidifeiniroo</span>
                            <a>En savoir plus</a>
                        </div>
                        <div className="pageEtoile-row">
                            <Rate allowHalf defaultValue={2.5} />
                            <a href="">Voir le seul avis</a>
                        </div>
                        <div className="pageDetail-bottom">
                            <div className="pageDetail-rows-prix">
                                <h3>Couleur</h3>
                                <div className="pageDetail-images">
                                    <img src={data?.image} alt="" className="pageDetail-sous-image" />
                                    <select name="" id="" className='pageDetail-select'>
                                        <option value="">Red</option>
                                        <option value="">Bleu</option>
                                        <option value="">Noir</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="pageDetail-rows-prix">
                            <div className="pageDetail-row-prix">
                                <h3>52,90 €</h3>
                                <span>Il y a 5 articles en stock pour cette combinaison</span>
                            </div>
                            <div className="pageDetail-row-Qt">
                                <div className="pageDetail-rows-Qt">
                                    <span>10</span>
                                    <div className="rowQT">
                                        <span>+</span>
                                        <span>-</span>
                                    </div>
                                </div>
                                <button>Ajouter au panier</button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default PageDetails