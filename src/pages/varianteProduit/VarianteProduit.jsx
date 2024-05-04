import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Select from 'react-select';
import './varianteProduit.scss'
import {FilterOutlined,SearchOutlined} from '@ant-design/icons';
import config from '../../config';
import { FadeLoader } from 'react-spinners';
import ReactPaginate from 'react-paginate';

const VarianteProduit = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const [getFamille,setGetFamille] = useState([]);
    const [getMarque,setGetMarque] = useState([]);
    const [getCible,setGetCible] = useState([]);
    const [getTaille,setGetTaille] = useState([]);
    const [getCouleur,setGetCouleur] = useState([]);
    const [couleur, setCouleur] = useState(null);
    const navigate = useNavigate();
    const [famille, setFamille] = useState(null);
    const [marque, setMarque] = useState(null);
    const [cible, setCible] = useState(null);
    const [taille, setTaille] = useState(null);
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

    const handlePageChange = (selectedPage) => {
      setCurrentPage(selectedPage.selected);
    };

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

/*     useEffect(() => {
      const fetchData = async () => {
        try {
          const url = marque.length > 0
          ? `${DOMAIN}/api/produit/varianteFiltreMarque/${marque}`
          : `${DOMAIN}/api/produit/varianteProduit`;

          const { data } = await axios.get(url);
          setData(data)
          setLoading(false)
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [DOMAIN,marque]); */

/*     useEffect(() => {
      const fetchData = async () => {
        try {
          const url = cible.length > 0 
          ? `${DOMAIN}/api/produit/varianteFiltreCible/${cible}`
          : `${DOMAIN}/api/produit/varianteProduit`
          const { data } = await axios.get(url);
          setData(data)
          setLoading(false)
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    }, [DOMAIN,cible]); */

/*     useEffect(() => {
      const fetchData = async () => {
        try {
          let url = `${DOMAIN}/api/produit/varianteProduit`;
    
          if ((marque || famille) && taille.length > 0) {
            url = `${DOMAIN}/api/produit/varianteFiltreTaille/${taille}`;
          }
    
          const { data } = await axios.get(url);
          setData(data);
          setLoading(false)
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchData();
    }, [DOMAIN, taille, marque, famille]); */


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

/*       useEffect(() => {
        const fetchData = async () => {
          try {
            const url = famille.length > 0
              ? `${DOMAIN}/api/produit/varianteFiltre/${famille}`
              : `${DOMAIN}/api/produit/varianteProduit`;
      
            const { data } = await axios.get(url);
            setData(data);
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchData();
      }, [DOMAIN, famille]); */

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
            const url = `${DOMAIN}/api/produit/varianteFiltre?id_famille=${famille}&id_marque=${marque}&id_cible=${cible}&id_taille=${taille}&id_couleur=${couleur}`
      
            const { data } = await axios.get(url);
            setData(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
      
        fetchData();
      }, [DOMAIN, famille, marque, cible, taille, couleur]);

  return (
    <>
        <div className="varianteProduit">
              <div className="varianteProduit-wrapper">
                <div className="varianteProduit-container-top">
                    <div className="varianteProduit-left">
                        <h2 className="varianteProduit-h2">Notre catalogue</h2>
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
                            placeholder=''
                            options={getFamille?.map(item => ({ value: item.id_famille, label: item.nom }))}
                            isMulti
                            onChange={(selectedOption) =>{
                              const selectedValues = selectedOption.map(option => option.value)
                              setFamille(selectedValues)
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
                            placeholder=''
                            isMulti
                            options={getMarque?.map(item => ({ value: item.id_marque, label: item.nom }))}
                            onChange={(selectedOption) =>{
                              const selectedValues = selectedOption.map(option => option.value)
                              setMarque(selectedValues)
                            }}
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
                            placeholder=''
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
                            placeholder=''
                            options={getTaille
                              ?.sort((a, b) => a.id_taille - b.id_taille) // Tri par ordre croissant des tailles
                              .map(item => ({ value: item.id_taille, label: item.taille }))
                            }
                            isMulti
                            onChange={(selectedOption) => {
                              const selectedValue = selectedOption.map(option => option.value);
                              setTaille(selectedValue);
                            }}
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
                        <div className="variante-top-row" key={dd.id} onClick={()=>navigate(`/pageDetail/${dd.id_varianteProduit}`)}>
                          <div className="cercle"></div>
{/*                               <Link to={`/pageDetailEdit/${dd.id_varianteProduit}`}>
                              </Link> */}
                          <img src={`${DOMAIN}${dd.img}`} alt="" className="variante-img" />
                        </div>
                        ))}
                      </div>)}
                    {loading === false &&  <ReactPaginate
                        pageCount={totalPages}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageChange}
                        previousLabel={'Précédent'}
                        nextLabel={'Suivant'}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        itemClass={'pointer-cursor'}
                      /> }
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default VarianteProduit