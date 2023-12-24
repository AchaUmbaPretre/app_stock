import { useLocation, useNavigate } from 'react-router-dom';
import './pageDetails.scss'
import config from '../../config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Rate } from 'antd';
import moment from 'moment';

const PageDetails = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getProduit, setGetProduit] = useState([]);
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const id = pathname.split('/')[2];
    const [quantity, setQuantity] = useState(1);


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

      const handleQuantity = (type) =>{

        type === "inc" ? setQuantity(quantity + 1) 
                      : quantity > 1 && setQuantity(quantity - 1)
    }


  return (
    <>
        <div className="pageDetails">
            <div className="pageDetail-wrapper">
                <div className="pageDetail-container">
                    <div className="pageDetail-left">
                        <img src={data?.img} alt="" className="pageDetail-img" />
                        <div className="pageDetail-left-wrapper" id='description'>
                            <h2>Description</h2>
                            <ul>
                                <li><strong>Matière : </strong>{data?.nom_matiere}</li>
                                <li><strong>Marque : </strong>{data?.nom_marque}</li>
                                <li><strong>Basket : </strong>{data?.nom_categorie}</li>
                                <li><strong>Couleurs : </strong>{data?.description}</li>
                                <li><strong>Cible : </strong>{data?.nom_cible}</li>
                                <li><strong>Pays : </strong>{data?.code_pays}</li>
                                <li><strong>Taille : </strong>{data?.pointure}</li>
                                <li><strong>Date d'entrée : </strong>{moment(data?.date_entrant).format('DD-MM-YYYY')}</li>
                            </ul>

                        </div>
                    </div>
                    <div className="pageDetail-right">
                        <h2 className="pageDetail-h2">{data?.nom_produit}</h2>
                        <div className="pagedetailDescr">
                            <span>{data?.code_pays}</span>
                            <a href='#description'>En savoir plus</a>
                        </div>
                        <div className="pageEtoile-row">
                            <Rate allowHalf defaultValue={2.5} />
                            <a href="">Voir le seul avis</a>
                        </div>
                        <div className="pageDetail-bottom">
                            <div className="pageDetail-rows-prix">
                                <h3>Couleur</h3>
                                <div className="pageDetail-images">
                                    <img src={data?.img} alt="" className="pageDetail-sous-image" />
                                    <select name="" id="" className='pageDetail-select'>
                                        <option value="">{data?.description}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="pageDetail-rows-prix">
                            <div className="pageDetail-row-prix">
                                <h3>{data?.prix} $</h3>
                                <span>Il y a {data?.stock} articles en stock pour cette combinaison</span>
                            </div>
                            <div className="pageDetail-row-Qt">
                                <div className="pageDetail-rows-Qt">
                                    <span>{quantity}</span>
                                    <div className="rowQT">
                                        <span onClick={()=>handleQuantity('inc')}>+</span>
                                        <span onClick={()=>handleQuantity('dec')}>-</span>
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