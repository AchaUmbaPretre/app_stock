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
            setData(data)
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

    const groupedData = data.reduce((acc, item) => {
        const { id_produit,nom_produit, pointure,date_entrant,nom_marque,nom_categorie,nom_matiere,nom_cible,code_pays,description,prix,nom_famille,img, ...rest } = item;
      
        if (!acc[id_produit]) {
          acc[id_produit] = { id_produit,nom_produit,pointure,date_entrant,nom_marque,nom_categorie,nom_matiere,nom_cible,code_pays,description,prix,nom_famille,img, pointure: [] };
        }
      
        acc[id_produit].pointure.push(pointure);
      
        return acc;
      }, {});

      const result = Object.values(groupedData);

      console.log(result)
    

  return (
    <>
        <div className="pageDetails">
            <div className="pageDetail-wrapper">
                <div className="pageDetail-container">
                    <div className="pageDetail-left">
                        <img src={data?.img} alt="" className="pageDetail-img" />
                        <div className="pageDetail-left-wrapper" id='description'>
                            <h2>Description</h2>
                            { result?.map((dd)=>(
                            <ul>
                                <li><strong>Matière : </strong>{dd?.nom_matiere}</li>
                                <li><strong>Marque : </strong>{dd?.nom_marque}</li>
                                <li><strong>Categorie : </strong>{dd?.nom_categorie}</li>
                                <li><strong>Famille : </strong>{dd?.nom_famille}</li>
                                <li><strong>Couleurs : </strong>{dd?.description}</li>
                                <li><strong>Cible : </strong>{dd?.nom_cible}</li>
                                <li><strong>Pays : </strong>{dd?.code_pays}</li>
                                <li><strong>Taille : </strong>{dd?.pointure.join(' à ')}</li>
                                <li><strong>Date d'entrée : </strong>{moment(dd?.date_entrant).format('DD-MM-YYYY')}</li>
                            </ul> ))}

                        </div>
                    </div>
                    { result?.map((dd)=>(
                    <div className="pageDetail-right">
                        <h2 className="pageDetail-h2">{data?.nom_produit}</h2>
                        <div className="pagedetailDescr">
                            <span>{dd?.code_pays}</span>
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
                                    <img src={dd?.img} alt="" className="pageDetail-sous-image" />
                                    <select name="" id="" className='pageDetail-select'>
                                        <option value="">{dd?.description}</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="pageDetail-rows-prix">
                            <div className="pageDetail-row-prix">
                                <h3>{dd?.prix} $</h3>
                                <span>Il y a {dd?.stock} articles en stock pour cette combinaison</span>
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
                    </div>))}
                </div>
            </div>
        </div>

    </>
  )
}

export default PageDetails