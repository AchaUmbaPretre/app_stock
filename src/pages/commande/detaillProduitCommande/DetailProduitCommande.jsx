import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowRightOutlined } from '@ant-design/icons';
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import './detailProduitCommande.scss'
import { FadeLoader } from 'react-spinners';
import config from '../../../config'
import { useSelector } from 'react-redux'
import { addProduct } from '../../../redux/cartRedux'
import AddIcon from '@mui/icons-material/Add';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { Image, Rate, Select } from 'antd'
import Swal from 'sweetalert2'
import { CircularProgress } from '@mui/material'



const DetailProduitCommande = ({idVariant, idCommande, tailles, setTailles}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const { Option } = Select;
    const [data, setData] = useState([]);
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const id_commande = location.pathname.split('/')[3];
    const [quantite, setQuantite] = useState(1);
  /*   const [taille, setTaille] = useState(tailles); */
    const [getTaille, setGetTaille] = useState([]);
    const [loading, setLoading] = useState(true);
    const [variante, setVariante] = useState([]);
    const [prix, setPrix] = useState();
    const [inventaireTotalOne,setInventaireTotalOne] = useState([]);
    const [idVarianteProduit, setIdVarianteProduit] = useState([]);
    const [stock, setStock] = useState([]);
    const [getCommande, setGetCommande] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const userId = useSelector((state) => state.user.currentUser.id)



        useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/varianteDetail/${idVariant}`);
            setData(data);
            setVariante(data[0]?.code_variant);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [id,idVariant]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/inventaire/${variante}`);
            const filteredData = data.filter(item => item.nombre_de_paires !== 0);
            const tailles = filteredData?.map(item => ({ id_taille: item.id_taille, taille: item.taille }));
            setGetTaille(tailles);
            setLoading(false);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN, variante]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/inventaire/inventaireTotalOne/${variante}`);
            setInventaireTotalOne(data[0].nombre_total_de_paires);
             setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,variante]);

      const handleQuantity = (type) =>{

        type === "inc" ? setQuantite(quantite + 1) 
                      : quantite > 1 && setQuantite(quantite - 1)
    }

    const groupedData = data.reduce((acc, item) => {
        const { id_produit, nom_produit, pointure, date_entrant, nom_marque, nom_categorie, nom_matiere, nom_cible, code_pays, description, prix, nom_famille, stock, img, ...rest } = item;
      
        if (!acc[id_produit]) {
          acc[id_produit] = { id_produit, nom_produit, pointure: [], date_entrant, nom_marque, nom_categorie, nom_matiere, nom_cible, code_pays, description, prix, nom_famille, stock, img };
        }
      
        acc[id_produit].pointure.push(pointure);
      
        return acc;
      }, {});
      
      const result = Object.values(groupedData);

/*       const handleClick = () =>{
        dispatch(
            addProduct({ ...result, quantite, id_taille: taille, id_varianteProduit: id })
        )
    } */


    useEffect(() => {
      const Vprix = result.map((dd) => dd.prix);
      const totalPrice = Vprix.reduce((accumulator, currentValue) => accumulator + (currentValue * quantite), 0);
      setPrix(totalPrice);
    });

    useEffect(() => {
      const fetchData = async () => {
        try {
          const requests = tailles.map(async (dd) => {
            const { data } = await axios.get(`${DOMAIN}/api/commande/idVariantproduit/${variante}/${dd}`);
            return {
              idVarianteProduit: data.map((dd) => dd.id_varianteProduit),
              stock: data[0].stock
            };
          });
    
          const results = await Promise.all(requests);
    
          const idVarianteProduitArray = results.flatMap((result) => result.idVarianteProduit);
          const stockArray = results.map((result) => result.stock);
    
          setIdVarianteProduit(idVarianteProduitArray);
          setStock(stockArray[0]);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
      };
    
      fetchData();
    }, [DOMAIN, variante, tailles]);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`${DOMAIN}/api/commande/commandeOne/${idCommande}`);
          setGetCommande(data[0]);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [DOMAIN,id_commande]);


    const handleClick = async (e) => {
      e.preventDefault();
    
      if (!tailles || tailles.length === 0) {
        Swal.fire({
          title: 'Error',
          text: 'Veuillez choisir une pointure',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        return;
      }
    
      try {
        setIsLoading(true);
    
        for (let i = 0; i < tailles.length; i++) {
          const dd = tailles[i];
          const idVarianteProduitValue = idVarianteProduit[i];
    
          await axios.post(`${DOMAIN}/api/commande/detail-commande`, {
            id_commande: idCommande,
            id_varianteProduit: idVarianteProduitValue,
            quantite: quantite,
            prix: prix,
            id_taille: dd,
            user_cr: userId
          });
        }
    
        Swal.fire({
          title: 'Success',
          text: 'Commande créée avec succès!',
          icon: 'success',
          confirmButtonText: 'OK',
        });

        setTailles([]);
    
      } catch (err) {
        Swal.fire({
          title: 'Error',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      } finally {
        setIsLoading(false);
      }
    };

  return (
    <>
        <div className="detailProduitCommande">
        { loading ? (
              <div className="spinner-container">
                <FadeLoader color={'#36D7B7'} loading={loading} />
              </div>
            ) : (
              <div className="detailProduit-wrapper">
                {result.map((dd)=>(

                <div className="detail-container-bottom">
                    <div className="detail-container-rows">
                        <div className="detail-bottom-left">
                          <Image src={`${DOMAIN}${dd.img}`} alt="" className="detail-bottom-img" />
                        </div>
                        <div className="detail-bottom-right">
                            <h1 className="product-titre">{dd?.nom_produit}</h1>
                            <h2 className="product-titre" style={{color:'#6d6c6c', fontSize:'17px'}}>{dd?.nom_marque}</h2>
                            <p className="product-desc">{dd?.code_pays}</p>
                            <p className="product-desc">Il y a {inventaireTotalOne} article{inventaireTotalOne === 1 ? '' : "s"} en stock</p>
                            <div className="product-rate">
                                <div className="pageEtoile-row">
                                    <Rate allowHalf defaultValue={3.5} />
                                    <a href="/"> Voir le seul avis</a>
                                </div>
                                <span className="product-price">{dd.prix} $</span>
                            </div>
                            {quantite > 1 && <span className="product-price">Prix total: {prix} $</span>}
                            <div className="filter-products">
                                <div className="filter-product-row">
                                    <div className="filters">
                                        <span className="filter-titre">Couleur</span>
                                        <div className={`${dd.description}`} color={dd.description} />
                                    </div>
                                    <div className="filters">
                                        <span className="filter-titre">Taille</span>
                                        <Select
                                          placeholder="Sélectionnez une pointure"
                                          style={{ width: "200px" }}
                                          className="filter-titre"
                                          mode="multiple"
                                          onChange={(selectedValues) => setTailles(selectedValues)}
                                        >
                                          <Option className="taille_pla" disabled>Sélectionnez une pointure</Option>
                                          {getTaille?.sort((a, b) => a.taille - b.taille).map((s) => (
                                            <Option value={s.id_taille} key={s.id_taille}>{s.taille}</Option>
                                          ))}
                                        </Select>
                                    </div>
                                </div>                             
                                <div className="filter-product">
                                    <div className="filter">
                                        <AddIcon className="filter-icon" onClick={()=>handleQuantity('inc')}/>
                                        <span className="filter-nb">{quantite}</span>
                                        <RemoveOutlinedIcon className="filter-icon" onClick={()=>handleQuantity('desc')}/>
                                    </div>
                                    {tailles && quantite > stock && <div style={{color:'red', fontSize:"12px"}}>Il ya que {stock} dans le stock pour cette pointure</div>}
                                    <div className="filter">
                                        <button className="filter-btn" onClick={handleClick} disabled={isLoading || tailles && quantite > stock ? true : false}>Envoyer</button>
                                        {isLoading && (
                                            <div className="loader-container loader-container-center">
                                              <CircularProgress size={28} />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <Link to={`/listeDetailView/${idCommande}`} style={{padding: "10px", textDecoration:'underline'}}>Retournez à la commande <ArrowRightOutlined /></Link>
                            </div>
                        </div>
                    </div>
                    <div className="detail-rows-bottom"> { getCommande && <>
                      <div className="detail-rows-bottom-left">
                        <h2 style={{fontSize:'1rem', color:'rgb(1, 35, 138)'}}>Commande N° {idCommande}</h2>
                        <span style={{fontSize:'.8rem', color:'#6d6c6c'}}>de {getCommande?.nom} de la commune {getCommande?.nom_commune} Av/ {getCommande?.avenue} Q/ {getCommande?.quartier} N° {getCommande?.num}</span>
                      </div>
                      <div className="detail-rows-bottom-left">
                        <h2 style={{fontSize:'1rem', color:'rgb(1, 35, 138)'}}>Contactez de {getCommande?.nom}</h2>
                        <span className="variant-name" style={{fontSize:'.8rem', color:'#6d6c6c'}}>{getCommande?.telephone}</span>
                      </div> </>}
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