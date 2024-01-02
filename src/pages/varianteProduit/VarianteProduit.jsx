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
import { FadeLoader } from 'react-spinners';
import { set } from 'date-fns'


const VarianteProduit = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getProduit, setGetProduit] = useState([]);
    const [data, setData] = useState([]);
    const [getFamille,setGetFamille] = useState([]);
    const [getMarque,setGetMarque] = useState([]);
    const [getCible,setGetCible] = useState([]);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const id = pathname.split('/')[2];
    const [famille, setFamille] = useState(null);
    const [marque, setMarque] = useState(null);
    const [cible, setCible] = useState(null);
    const [loading, setLoading] = useState(true);

/*     useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/varianteFiltre/${famille}`);
            setData(data)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [famille]); */

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
            const { data } = await axios.get(`${DOMAIN}/api/produit/famille`);
            setGetFamille(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

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

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/marque`);
            setGetMarque(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/cible`);
            setGetCible(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);
      
  return (
    <>
        <div className="varianteProduit">
        { loading ? (
              <div className="spinner-container">
                <FadeLoader color={'#36D7B7'} loading={loading} />
              </div>
            ) : (
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
                            name='id_marque'
                            className='variant-select'
                            options={getMarque?.map(item => ({ value: item.id_marque, label: item.nom }))}
                            onChange={(selectedOption) => setMarque(selectedOption.value)}
                          />
                        </div>
                        <div className="variant-top-left">
                          <div className="variant-top-row">
                            <FilterOutlined className='variant-icon'/>
                            <span>filtrer par cible</span>
                          </div>
                          <Select
                            name='id_cible'
                            className='variant-select'
                            options={getCible?.map(item => ({ value: item.id_cible, label: item.nom_cible }))}
                            onChange={(selectedOption) => setCible(selectedOption.value)}
                          />
                        </div>
                    </div>
                    <div className="variant_bottom">
                      <div className="variante-top-rows">
                      {
                          data?.map((dd)=>(
                        <div className="variante-top-row" key={dd.id} onClick={()=>navigate(`/pageDetail/${dd.id_varianteProduit}`)}>
                          <div className="cercle"></div>
                          <img src={dd.img} alt="" className="variante-img" />
                          <div className="info-products">
                              <Link to={`/pageDetail/${dd.id_varianteProduit}`}>
                                <div className="icon-products"><SearchOutlined className='icon'/></div>
                              </Link>
                          </div>
                        </div>
                        ))}
                      </div>
                    </div>
                </div>
            </div>
            )}
        </div>

    </>
  )
}

export default VarianteProduit