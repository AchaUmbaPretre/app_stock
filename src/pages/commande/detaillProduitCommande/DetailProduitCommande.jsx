import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import './detailProduitCommande.scss'
import { FadeLoader } from 'react-spinners';
import config from '../../../config'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../../../redux/cartRedux'
import AddIcon from '@mui/icons-material/Add';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { Rate } from 'antd'
import Swal from 'sweetalert2'


const DetailProduitCommande = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const id_commande = location.pathname.split('/')[3];
    const [quantite, setQuantite] = useState(1);
    const [taille, setTaille] = useState(null);
    const [getTaille, setGetTaille] = useState([]);
    const [loading, setLoading] = useState(true);
    const [variante, setVariante] = useState([]);
    const [inventaire, setInventaire] = useState([]);
    const [prix, setPrix] = useState();
    const [inventaireTotalOne,setInventaireTotalOne] = useState([]);
    const [getClient, setGetClient] = useState([]);
    const [client, setClient] = useState([]);
    const navigate = useNavigate();
    const userId = useSelector((state) => state.user.currentUser.id)

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
      }, [variante]);

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
          const { data } = await axios.get(`${DOMAIN}/api/client`);
          setGetClient(data);
          setLoading(false)
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);


    const handleClick = async (e) => {
      e.preventDefault();
  
      if (!taille) {
        Swal.fire({
          title: 'Error',
          text: 'Veuillez choisir une pointure',
          icon: 'error',
          confirmButtonText: 'OK',
        });
        return;
      }
      try{
        await axios.post(`${DOMAIN}/api/commande/detail-commande`, {id_commande:id_commande, id_varianteProduit:id, id_client: client, quantite: quantite, prix: prix, id_taille: taille, user_cr: userId})
        Swal.fire({
          title: 'Success',
          text: 'Commande créée avec succès!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigate('/listeCommande')
        window.location.reload();
  
      }catch(err) {
        Swal.fire({
          title: 'Error',
          text: err.message,
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
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
                {result.map((dd)=>(

                <div className="detail-container-bottom">
                    <div className="detail-container-rows">
                        <div className="detail-bottom-left">
                            <img src={dd.img} alt="" className="detail-bottom-img" />
                        </div>
                        <div className="detail-bottom-right">
                            <h1 className="product-titre">{dd?.nom_produit}</h1>
                            <p className="product-desc">{dd?.code_pays}</p>
                            <p className="product-desc">Il y a {inventaireTotalOne} articles en stock</p>
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
                                        <select name="id_taille" id="" className='select-filter' onChange={(e)=>setTaille(e.target.value)}>
                                          <option>Sélectionnez une pointure</option>
                                        { getTaille?.map((s) =>(
                                                <option value={s.id_taille} key={s.id_taille}>{s.taille}</option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="detail_client-row">
                                  <label htmlFor="">Client </label>
                                  <select name="id_client" id="" onChange={(e)=>setClient(e.target.value)}>
                                    <option>Sélectionnez un client</option>
                                    { getClient.map((dd)=>(
                                      <option value={dd.id}>{dd.nom}</option>
                                    ))
                                    }
                                  </select>
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