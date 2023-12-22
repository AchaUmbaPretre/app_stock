import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Select from 'react-select';
import moment from 'moment';
import { Image } from 'antd';
import './varianteProduit.scss'
import {FilterOutlined,ShoppingCartOutlined,SearchOutlined,HeartOutlined} from '@ant-design/icons';
import config from '../../config'

const VarianteProduit = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getProduit, setGetProduit] = useState([]);
    const [data, setData] = useState([]);
    const [getFamille,setGetFamille] = useState([]);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const id = pathname.split('/')[2];
    const [famille, setFamille] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/varianteFiltre/${famille}`);
            setData(data)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [famille]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/famille`);
            setGetFamille(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/varianteProduit`);
            setData(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

      console.log(data)
      

      const formattedDatEntrant = moment(getProduit?.date_entree).format('DD-MM-YYYY');
      console.log(famille)
  return (
    <>
        <div className="varianteProduit">
            <div className="varianteProduit-wrapper">
                <div className="varianteProduit-container-top">
                    <div className="varianteProduit-left">
                        <h2 className="varianteProduit-h2">Les produits</h2>
                        <span>Voir les images de produits</span>
                    </div>
                </div>
                <div className="variant-container-bottom">
                    <div className="variant_top">
                        <div className="variant-top-left">
                          <div className="variant-top-row">
                            <FilterOutlined className='variant-icon'/>
                            <span>filtrer par categorie</span>
                          </div>
                          <Select
                            name='id_famille'
                            className='variant-select'
                            options={getFamille?.map(item => ({ value: item.id_famille, label: item.nom }))}
                            onChange={(selectedOption) => setFamille(selectedOption.value)}
                          />
                        </div>
                        <div className="variant-top-left">
                          <div className="variant-top-row">
                            <FilterOutlined className='variant-icon'/>
                            <span>filtrer par marque</span>
                          </div>
                          <Select
                            name='id_famille'
                            className='variant-select'
                            options={getFamille?.map(item => ({ value: item.id_famille, label: item.nom }))}
                            onChange={(selectedOption) => setFamille(selectedOption.value)}
                          />
                        </div>
                        <div className="variant-top-left">
                          <div className="variant-top-row">
                            <FilterOutlined className='variant-icon'/>
                            <span>filtrer par cible</span>
                          </div>
                          <Select
                            name='id_famille'
                            className='variant-select'
                            options={getFamille?.map(item => ({ value: item.id_famille, label: item.nom }))}
                            onChange={(selectedOption) => setFamille(selectedOption.value)}
                          />
                        </div>
                    </div>
                    <div className="variant_bottom">
                      <div className="variante-top-rows">
                      {
                          data?.map((dd)=>(
                        <div className="variante-top-row" key={dd.id}>
                          <div className="cercle"></div>
                          <img src={dd.image} alt="" className="variante-img" />
                          <div className="info-products">
                            <div className="icon-products"><ShoppingCartOutlined className='icon'/></div>
                              <Link to={`/pageDetail/${dd.id_varianteProduit}`}>
                                <div className="icon-products"><SearchOutlined className='icon'/></div>
                              </Link>
                            <div className="icon-products"><HeartOutlined className='icon1'/></div>
                          </div>
                        </div>
                        ))}
                      </div>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default VarianteProduit