import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import './cart.scss'
import { FadeLoader } from 'react-spinners';
import config from '../../../config'
import logo from './../../../assets/logo doe.jpg'
import AddIcon from '@mui/icons-material/Add';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { useSelector } from 'react-redux'
import { Rate } from 'antd'


const Cart = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const id = pathname.split('/')[2];
    const [famille, setFamille] = useState(null);
    const [marque, setMarque] = useState(null);
    const [cible, setCible] = useState(null);
    const [loading, setLoading] = useState(false);
    const cart = useSelector((state) => state?.cart);

    console.log(cart)

    
  return (
    <>
        <div className="cart">
        { loading ? (
              <div className="spinner-container">
                <FadeLoader color={'#36D7B7'} loading={loading} />
              </div>
            ) : (
              <div className="cart-wrapper">
                <div className="cart-container-top">
                    <div className="cart-left">
                        <h2 className="cart-h2">Liste des commandes</h2>
                        <span>Voir les commandes</span>
                    </div>
                </div>
                <div className="cart-bottom">
                  <div className="cart-bottom-rows">
                    <div className="cart-bottom-row">
                    { cart && cart?.products && cart.products.map((dd) =>(
                      <div className="cart-bottom-left">
                        <img src={dd[0]?.img} alt="" className="cart-row-img" />
                        <div className="cart-row-center">
                          <span className="cart-product-name"><b>Product :</b> {dd[0]?.nom_marque}</span>
                          <div className="pageEtoile-row">
                            <Rate allowHalf defaultValue={3.5} />
                          </div>
                          <span className="cart-product-id"><b>ID :</b> {dd.id_varianteProduit}</span>
                          <div className={`cart-product-color ${dd[0]?.description}`}></div>
                          <span className="cart-product-size"><b>Size :</b> {dd[0].id_taille}</span>
                          <div className="cart-product-price"><b>Prix :</b>{dd[0].prix} $</div>
                        </div>
                        <div className="cart-row-right">
                          <div className="cart-amount">
                            <AddIcon className="product-icon"/>
                              <span className="cart-product-amount">{dd.quantite}</span>
                            <RemoveOutlinedIcon className="product-icon"/>
                          </div>
                          <span className="cart-product-prix">{dd.quantite * dd[0].prix} $</span>
                        </div>
                      </div>))}
                    </div>
                    <div className="cart-bottom-right">
                      <h1 className="cart-summary-title">RÉCAPITULATIF DE LA COMMANDE</h1>
                      <div className="cart-summary-items">
                        <span className="cart-summary-txt">Total</span>
                        <span className="cart-summary-price">{cart.total} $</span>
                      </div>

                      <div className="cart-summary-items">
                        <span className="cart-summary-txt">Frais de livraison estimés</span>
                        <span className="cart-summary-price">$ 450</span>
                      </div>

                      <div className="cart-summary-items">
                        <span className="cart-summary-txt">Remise sur les frais d'expédition</span>
                            <span className="cart-summary-price">$ 410</span>
                      </div>

                        <div className="cart-summary-items">
                            <span className="cart-summary-txt cart-black">Total</span>
                            <span className="cart-summary-price cart-black">$ {cart.total} $</span>
                        </div>
                        <button className="cart-summary-btn">PASSER À LA CAISSE</button>
                    </div>
                  </div>
                </div>
            </div>
            )}
        </div>

    </>
  )
}

export default Cart