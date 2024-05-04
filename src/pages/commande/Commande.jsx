import React from 'react'
import { useLocation, Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Select from 'react-select';
import './commande.scss'
import {FilterOutlined,ShoppingCartOutlined,SearchOutlined,HeartOutlined} from '@ant-design/icons';
import { Modal} from 'antd';
import config from '../../config'
import { FadeLoader } from 'react-spinners';
import DetailProduitCommande from './detaillProduitCommande/DetailProduitCommande'
import ReactPaginate from 'react-paginate'

const Commande = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const [getFamille,setGetFamille] = useState([]);
    const [getMarque,setGetMarque] = useState([]);
    const [getCible,setGetCible] = useState([]);
    const [getCouleur,setGetCouleur] = useState([]);
    const [couleur, setCouleur] = useState(null);
    const {pathname} = useLocation();
    const id = pathname.split('/')[2];
    const [marque, setMarque] = useState(null);
    const [cible, setCible] = useState(null);
    const [getTaille,setGetTaille] = useState([]);
    const [taille, setTaille] = useState(null);
    const [getCommande, setGetCommande] = useState([]);
    const [famillesSelectionnees, setFamillesSelectionnees] = useState([]);
    const [open, setOpen] = useState(false);
    const [idVariante, setIdVariante] = useState({});
    const [idCommande, setIdCommande] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const groupedData = Object.values(
      data.reduce((acc, item) => {
        const { code_variant, ...rest } = item;
        if (acc[code_variant]) {
          Object.assign(acc[code_variant], { data: [...acc[code_variant].data, rest] });
        } else {
          acc[code_variant] = { code_variant, data: [rest] };
        }
        return acc;
      }, {})
    );
    const itemsPerPage = 12;
    const totalPages = Math.ceil(groupedData.length / itemsPerPage);
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const firstDataArray = groupedData.map(obj => obj.data[0]);
    const currentData = firstDataArray?.slice(startIndex, endIndex);
    const [tailleDetail, setTailleDetail] = useState([]);

      const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
      };

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
      }, [DOMAIN]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const url = `${DOMAIN}/api/produit/varianteFiltre?id_famille=${famillesSelectionnees}&id_marque=${marque}&id_cible=${cible}&id_taille=${taille}&id_couleur=${couleur}`
      
            const { data } = await axios.get(url);
            setData(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchData();
      }, [DOMAIN, famillesSelectionnees, marque, cible, taille, couleur]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/marque`);
            setGetMarque(data);
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
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/couleur`);
            setGetCouleur(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/commande/commandeOne/${id}`);
            setGetCommande(data[0]);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,id]);
      
      const showModal = (e,f) => {
        setOpen(true);
        setIdVariante(e)
        setIdCommande(f)
      };
      
  return (
    <>
        <div className="varianteProduit">
              <div className="varianteProduit-wrapper">
                <div className="varianteProduit-container-top">
                {getCommande && <>
                    <div className="varianteProduit-left">
                        <h2 className="varianteProduit-h2">La commande N° {id}</h2>
                        <span>de {getCommande?.nom} de la commune {getCommande?.nom_commune} Av/ {getCommande?.avenue} Q/ {getCommande?.quartier} N° {getCommande?.num}</span>
                    </div>
                    <div className="varianteProduit-right" style={{display:'flex', flexDirection:'column'}}>
                      <h2 style={{fontSize:'.9rem', color:'rgb(1, 35, 138)'}}>Contact de {getCommande?.nom}</h2>
                      <span className="variant-name" style={{fontSize:'.7rem', color:'#6d6c6c'}}>{getCommande?.telephone}</span>
                    </div> </>
                  }
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
                            isMulti
                            onChange={(selectedOptions) => {
                              const selectedValues = selectedOptions.map(option => option.value);
                              setFamillesSelectionnees(selectedValues);
                            }}
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
                            isMulti
                            options={getMarque?.map(item => ({ value: item.id_marque, label: item.nom }))}
                            onChange={(selectedOption) => {
                              const selectedValues = selectedOption.map(option => option.value)
                             setMarque(selectedValues)}
                            }
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
                            isMulti
                            options={getCible?.map(item => ({ value: item.id_cible, label: item.nom_cible }))}
                            onChange={(selectedOption) => {
                              const selectedValue = selectedOption.map(option => option.value)
                              setCible(selectedValue)}
                            }
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
                            isMulti
                            onChange={(selectedOption) => {
                              const selectedValue = selectedOption.map(option => option.value)
                              setTaille(selectedValue)}
                            }
                          />
                        </div>
                        <div className="variant-top-left">
                          <div className="variant-top-row">
                            <FilterOutlined className='variant-icon'/>
                            <span>Couleur</span>
                          </div>
                          <Select
                            name='id_couleur'
                            className='variant-select'
                            options={getCouleur?.map(item => ({ value: item.id_couleur, label: item.description }))}
                            isMulti
                            onChange={(selectedOption) => {
                              const selectedValue = selectedOption.map(option => option.value)
                              setCouleur(selectedValue)}
                            }
                          />
                        </div>
                    </div>
                    <div className="variant_bottom">
                    { loading ? (
                      <div className="spinner-container">
                        <FadeLoader color={'#36D7B7'} loading={loading} />
                      </div>
                    ) : (
                      <div className="variante-top-rows">
                      {
                        currentData?.map((dd)=>(
                        <div className="variante-top-row" key={dd.id}>
                          <div className="cercle"></div>
                          <img src={`${DOMAIN}${dd.img}`} alt="" className="variante-img" onClick={()=> showModal(dd.id_varianteProduit,id)} />
                          <div className="info-products">
                            <div className="icon-products"><ShoppingCartOutlined className='icon'/></div>
                              <Link onClick={()=> showModal(dd.id_varianteProduit,id)}>
                                <div className="icon-products"><SearchOutlined className='icon'/></div>
                              </Link>
                            <div className="icon-products"><HeartOutlined className='icon1'/></div>
                          </div>
                        </div>
                        ))}
                        <Modal
                          centered
                          open={open}
                          onCancel={() => {
                            setOpen(false)
                            setTailleDetail([])
                          }}
                          width={950}
                          footer={[
                          ]}
                        >
                         <DetailProduitCommande idVariant={idVariante} idCommande={idCommande} tailles={tailleDetail} setTailles={setTailleDetail}/>
                        </Modal>
                      </div>  )}
                      <ReactPaginate
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        previousLabel={'Précédent'}
                        nextLabel={'Suivant'}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                      />
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Commande