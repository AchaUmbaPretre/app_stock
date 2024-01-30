import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Select from 'react-select';
import './varianteProduit.scss'
import {FilterOutlined,SearchOutlined} from '@ant-design/icons';
import config from '../../config'
import { FadeLoader } from 'react-spinners';


const VarianteProduit = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const [getFamille,setGetFamille] = useState([]);
    const [getMarque,setGetMarque] = useState([]);
    const [getCible,setGetCible] = useState([]);
    const [getTaille,setGetTaille] = useState([]);
    const navigate = useNavigate();
    const [famille, setFamille] = useState(null);
    const [marque, setMarque] = useState(null);
    const [cible, setCible] = useState(null);
    const [taille, setTaille] = useState(null);
    const [loading, setLoading] = useState(true);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get( marque ? `${DOMAIN}/api/produit/varianteFiltreMarque/${marque}` : `${DOMAIN}/api/produit/varianteProduit`);
            setData(data)
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,marque]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get( cible ? `${DOMAIN}/api/produit/varianteFiltreCible/${cible}` : `${DOMAIN}/api/produit/varianteProduit`);
            setLoading(false)
            setData(data)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,cible]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(marque ? `${DOMAIN}/api/produit/varianteFiltreTaille/${taille}` : `${DOMAIN}/api/produit/varianteProduit` );
            setLoading(false)
            setData(data)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,taille,marque]);


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
      }, [DOMAIN]);

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
      }, [DOMAIN,famille]);

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
      }, [DOMAIN]);

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
      }, [DOMAIN]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/tailleAll`);
            setGetTaille(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);

      console.log(data.length === 0)
      
  return (
    <>
        <div className="varianteProduit">
              <div className="varianteProduit-wrapper">
                <div className="varianteProduit-container-top">
                    <div className="varianteProduit-left">
                        <h2 className="varianteProduit-h2">Nos produits</h2>
                        <span>Voir les images de produits</span>
                    </div>
                </div>
                <div className="variant-container-bottom">
                    <div className="variant_top">
                        <div className="variant-top-left">
                          <div className="variant-top-row">
                            <FilterOutlined className='variant-icon'/>
                            <span>Categorie</span>
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
                            <span>Marque</span>
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
                            <span>Cible</span>
                          </div>
                          <Select
                            name='id_cible'
                            className='variant-select'
                            options={getCible?.map(item => ({ value: item.id_cible, label: item.nom_cible }))}
                            onChange={(selectedOption) => setCible(selectedOption.value)}
                          />
                        </div>
                        <div className="variant-top-left">
                          <div className="variant-top-row">
                            <FilterOutlined className='variant-icon'/>
                            <span>Pointure</span>
                          </div>
                          <Select
                            name='id_taille'
                            className='variant-select'
                            options={getTaille?.map(item => ({ value: item.id_taille, label: item.taille }))}
                            onChange={(selectedOption) => setTaille(selectedOption.value)}
                          />
                        </div>
                    </div>
                    <div className="variant_bottom">
                    { data.length === 0 ? (
                      <div className="spinner-container">
                        <FadeLoader color={'#36D7B7'} loading={data.length === 0} />
                      </div>
                    ) : (
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
                      </div>)}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default VarianteProduit