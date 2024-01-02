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
import logo1 from './../../../assets/logo doe.jpg'
import AddIcon from '@mui/icons-material/Add';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';


const DetailProduitCommande = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const dispatch = useDispatch();
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

      const handleQuantity = (type) =>{

        type === "inc" ? setQuantity(quantity + 1) 
                      : quantity > 1 && setQuantity(quantity - 1)
    }

    const handleClick = () =>{
        dispatch(
            addProduct({ ...product, quantity, color, size })
        )
    }


      
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
                <div className="detail-container-bottom">
                    <div className="detail-container-rows">
                        <div className="detail-bottom-left">
                            <img src={logo1} alt="" className="detail-bottom-img" />
                        </div>
                        <div className="detail-bottom-right">
                            <h1 className="product-titre">Versace</h1>
                            <p className="product-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio doloremque, possimus pariatur quae tempora exercitationem beatae illo officiis itaque consequuntur amet delectus quis, aperiam optio magnam quod dolor eveniet impedit.</p>
                            <span className="product-price">$ 100</span>
                            <div className="filter-products">
                                <div className="filter-product-row">
                                    <div className="filters">
                                        <span className="filter-titre">Color</span>
    {/*                                 {
                                            product.color?.map(c =>(
                                                <div className={`filter-color ${c}`} key={c} color={c} />
                                            )) 
                                        } */}
                                    </div>
                                    <div className="filters">
                                        <span className="filter-titre">Taille</span>
                                        <select name="" id="" className='select-filter'>
                                        <option value="">ADDDD</option>
                                        {/* { product.size?.map((s) =>(
                                                <option value="" key={s} >{s}</option>
                                                ))} */}
                                        </select>
                                    </div>
                                </div>                                
                                <div className="filter-product">
                                    <div className="filter">
                                        <AddIcon className="filter-icon" onClick={()=>handleQuantity('inc')}/>
                                        <span className="filter-nb">{quantity}</span>
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
            </div>
            )}
        </div>

    </>
  )
}

export default DetailProduitCommande