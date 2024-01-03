import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Select from 'react-select';
import './detailProduitCommande.scss'
import { FadeLoader } from 'react-spinners';
import config from '../../../config'
import { useDispatch } from 'react-redux'
import { addProduct } from '../../../redux/cartRedux'
import AddIcon from '@mui/icons-material/Add';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { Rate } from 'antd'


const DetailProduitCommande = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [product, setProduct] = useState({});
    const [quantite, setQuantite] = useState(1);
    const [couleur, setCouleur] = useState("");
    const dispatch = useDispatch();
    const [taille, setTaille] = useState('');
    const [getTaille, setGetTaille] = useState([]);
    const [loading, setLoading] = useState(true);
    const [variante, setVariante] = useState([]);
    const [inventaire, setInventaire] = useState([]);

        useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/varianteDetail/${id}`);
            setData(data);
            setVariante(data[0]?.code_variant);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [id]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/inventaire/${variante}`);
            setInventaire(data);
            const tailles = data?.map(item => ({ id_taille: item.id_taille, taille: item.taille }));
            setGetTaille(tailles)
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [variante]);

      console.log(taille)

      const handleQuantity = (type) =>{

        type === "inc" ? setQuantite(quantite + 1) 
                      : quantite > 1 && setQuantite(quantite - 1)
    }

    const handleClick = () =>{
        dispatch(
            addProduct({ ...product, quantite, couleur, taille })
        )
    }

    console.log()

    const groupedData = data.reduce((acc, item) => {
        const { id_produit, nom_produit, pointure, date_entrant, nom_marque, nom_categorie, nom_matiere, nom_cible, code_pays, description, prix, nom_famille, stock, img, ...rest } = item;
      
        if (!acc[id_produit]) {
          acc[id_produit] = { id_produit, nom_produit, pointure: [], date_entrant, nom_marque, nom_categorie, nom_matiere, nom_cible, code_pays, description, prix, nom_famille, stock, img };
        }
      
        acc[id_produit].pointure.push(pointure);
      
        return acc;
      }, {});
      
      const result = Object.values(groupedData);
      
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
                {result.map((dd)=>(

                <div className="detail-container-bottom">
                    <div className="detail-container-rows">
                        <div className="detail-bottom-left">
                            <img src={dd.img} alt="" className="detail-bottom-img" />
                        </div>
                        <div className="detail-bottom-right">
                            <h1 className="product-titre">{dd?.nom_produit}</h1>
                            <p className="product-desc">{dd?.code_pays}</p>
                            <p className="product-desc">Il y a {dd?.stock} articles en stock</p>
                            <div className="product-rate">
                                <div className="pageEtoile-row">
                                    <Rate allowHalf defaultValue={3.5} />
                                    <a href="/"> Voir le seul avis</a>
                                </div>
                                <span className="product-price">{dd.prix} $</span>
                            </div>
                            <div className="filter-products">
                                <div className="filter-product-row">
                                    <div className="filters">
                                        <span className="filter-titre">Couleur</span>
                                        <div className={`${dd.description}`} color={dd.description} />
                                    </div>
                                    <div className="filters">
                                        <span className="filter-titre">Taille</span>
                                        <select name="" id="" className='select-filter' onChange={(e)=>setTaille(e.target.value)}>
                                        { getTaille?.map((s) =>(
                                                <option value={s.id_taille} key={s.id_taille} selected>{s.taille}</option>
                                                ))}
                                        </select>
                                    </div>
                                </div>                                
                                <div className="filter-product">
                                    <div className="filter">
                                        <AddIcon className="filter-icon" onClick={()=>handleQuantity('inc')}/>
                                        <span className="filter-nb">{quantite}</span>
                                        <RemoveOutlinedIcon className="filter-icon" onClick={()=>handleQuantity('desc')}/>
                                    </div>
                                    <div className="filter">
                                        <button className="filter-btn" onClick={handleClick}>Ajouter au panier</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                ))}
            </div>
            )}
        </div>

    </>
  )
}

export default DetailProduitCommande