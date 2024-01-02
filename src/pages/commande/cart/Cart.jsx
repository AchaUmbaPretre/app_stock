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
import MinimizeOutlinedIcon from '@mui/icons-material/MinimizeOutlined';


const Cart = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const id = pathname.split('/')[2];
    const [famille, setFamille] = useState(null);
    const [marque, setMarque] = useState(null);
    const [cible, setCible] = useState(null);
    const [loading, setLoading] = useState(true);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/varianteFiltreMarque/${marque}`);
            setData(data)
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [marque]);

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

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get( famille ? `${DOMAIN}/api/produit/varianteFiltre/${famille}`: `${DOMAIN}/api/produit/varianteProduit`);
            setData(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [famille]);

      
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
                      <div className="cart-bottom-left">
                        <img src={logo} alt="" className="cart-row-img" />
                        <div className="cart-row-center">
                          <span className="cart-product-name"><b>Product :</b> Produi1</span>
                          <span className="cart-product-id"><b>ID :</b> 11cdddd1</span>
                          <div className="cart-product-color"></div>
                          <span className="cart-product-size"><b>Size :</b> 45</span>
                          <div className="cart-product-price"><b>Prix :</b>$ 100</div>
                        </div>
                        <div className="cart-row-right">
                          <div className="cart-amount">
                            <AddIcon className="product-icon"/>
                              <span className="cart-product-amount">10</span>
                            <MinimizeOutlinedIcon className="product-icon"/>
                          </div>
                          <span className="cart-product-prix">$ 100</span>
                        </div>
                      </div>
                      <hr className="cart-hr"/>
                      <div className="cart-bottom-left">
                        <img src={logo} alt="" className="cart-row-img" />
                        <div className="cart-row-center">
                          <span className="cart-product-name"><b>Product :</b> Produi1</span>
                          <span className="cart-product-id"><b>ID :</b> 11cdddd1</span>
                          <div className="cart-product-color"></div>
                          <span className="cart-product-size"><b>Size :</b> 45</span>
                          <div className="cart-product-price"><b>Prix :</b>$ 100</div>
                        </div>
                        <div className="cart-row-right">
                          <div className="cart-amount">
                            <AddIcon className="product-icon"/>
                              <span className="cart-product-amount">10</span>
                            <MinimizeOutlinedIcon className="product-icon"/>
                          </div>
                          <span className="cart-product-prix">$ 100</span>
                        </div>
                      </div>
                      <hr className="cart-hr"/>
                      <div className="cart-bottom-left">
                        <img src={logo} alt="" className="cart-row-img" />
                        <div className="cart-row-center">
                          <span className="cart-product-name"><b>Product :</b> Produi1</span>
                          <span className="cart-product-id"><b>ID :</b> 11cdddd1</span>
                          <div className="cart-product-color"></div>
                          <span className="cart-product-size"><b>Size :</b> 45</span>
                          <div className="cart-product-price"><b>Prix :</b>$ 100</div>
                        </div>
                        <div className="cart-row-right">
                          <div className="cart-amount">
                            <AddIcon className="product-icon"/>
                              <span className="cart-product-amount">10</span>
                            <MinimizeOutlinedIcon className="product-icon"/>
                          </div>
                          <span className="cart-product-prix">$ 100</span>
                        </div>
                      </div>
                      <hr className="cart-hr"/>
                    </div>
                    <div className="cart-bottom-right">
                      <h1 className="cart-summary-title">ORDER SUMMARY</h1>
                      <div className="cart-summary-items">
                        <span className="cart-summary-txt">Subtotal</span>
                        <span className="cart-summary-price">$ 100</span>
                      </div>

                      <div className="cart-summary-items">
                        <span className="cart-summary-txt">Estimated Shipping</span>
                        <span className="cart-summary-price">$ 450</span>
                      </div>

                      <div className="cart-summary-items">
                        <span className="cart-summary-txt">Shipping Discount</span>
                            <span className="cart-summary-price">$ 410</span>
                      </div>

                        <div className="cart-summary-items">
                            <span className="cart-summary-txt cart-black">Total</span>
                            <span className="cart-summary-price cart-black">$ 100</span>
                        </div>
                        <button className="cart-summary-btn">CHECKOUT NOW</button>
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