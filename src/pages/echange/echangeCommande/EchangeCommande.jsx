import React from 'react';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import config from '../../../config';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { Image, Rate, Modal } from 'antd';
import Swal from 'sweetalert2';
import { CircularProgress } from '@mui/material';

const EchangeCommande = ({idVariant, idCommande}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const id_commande = location.pathname.split('/')[3];
    const searchParams = new URLSearchParams(location.search);
    const idDetail = searchParams.get('id_detail');
    const [quantite, setQuantite] = useState(1);
    const [taille, setTaille] = useState(null);
    const [getTaille, setGetTaille] = useState([]);
    const [loading, setLoading] = useState(true);
    const [variante, setVariante] = useState([]);
    const [prix, setPrix] = useState();
    const [inventaireTotalOne, setInventaireTotalOne] = useState([]);
    const [idVarianteProduit, setIdVarianteProduit] = useState([]);
    const [stock, setStock] = useState([]);
    const [getCommande, setGetCommande] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const userId = useSelector((state) => state.user.currentUser.id);
    const [livreur, setLivreur] = useState([]);
    const [getLivreur, setGetLivreur] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);

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
    }, [id, idVariant]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${DOMAIN}/api/livreur`);
                setGetLivreur(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [DOMAIN]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${DOMAIN}/api/inventaire/${variante}`);
                const tailles = data?.map(item => ({ id_taille: item.id_taille, taille: item.taille }));
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
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [DOMAIN, variante]);

    const handleQuantity = (type) => {
        type === "inc" ? setQuantite(quantite + 1) 
                      : quantite > 1 && setQuantite(quantite - 1);
    };

    const groupedData = data.reduce((acc, item) => {
        const { id_produit, nom_produit, pointure, date_entrant, nom_marque, nom_categorie, nom_matiere, nom_cible, code_pays, description, prix, nom_famille, stock, img, ...rest } = item;
      
        if (!acc[id_produit]) {
          acc[id_produit] = { id_produit, nom_produit, pointure: [], date_entrant, nom_marque, nom_categorie, nom_matiere, nom_cible, code_pays, description, prix, nom_famille, stock, img };
        }
      
        acc[id_produit].pointure.push(pointure);
      
        return acc;
    }, {});
      
    const result = Object.values(groupedData);

    useEffect(() => {
        const Vprix = result.map((dd) => dd.prix);
        const totalPrice = Vprix.reduce((accumulator, currentValue) => accumulator + (currentValue * quantite), 0);
        setPrix(totalPrice);
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${DOMAIN}/api/commande/idVariantproduit/${variante}/${taille}`);
                setIdVarianteProduit(data[0].id_varianteProduit);
                setStock(data[0].stock);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [DOMAIN, variante, taille]);

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
    }, [DOMAIN, id_commande]);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        setIsModalVisible(false);
        setIsLoading(true);
        
        try {
            await axios.post(`${DOMAIN}/api/vente/echangeLivraison`, {
                id_commande: idCommande, 
                id_varianteProduit: idVarianteProduit, 
                quantite: quantite, 
                prix: prix, 
                id_livreur: livreur,
                quantite_prix: prix,
                qte_livre: quantite,
                qte_commande: quantite,
                id_taille: taille, 
                id_user_cr: userId,
                id_type_mouvement: 7,
                id_detail_commande: idDetail
            });

            Swal.fire({
                title: 'Succès',
                text: 'Commande créée avec succès !',
                icon: 'success',
                confirmButtonText: 'OK',
            });

        } catch (err) {
            Swal.fire({
                title: 'Erreur',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    const handleClick = (e) => {
        e.preventDefault();

        if (!taille) {
            Swal.fire({
                title: 'Erreur',
                text: 'Veuillez choisir une pointure',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }
        
        showModal();
    };

    return (
        <>
            <div className="detailProduitCommande">
                <h1>Echange</h1>
                {loading ? (
                    <div className="spinner-container">
                        <FadeLoader color={'#36D7B7'} loading={loading} />
                    </div>
                ) : (
                    <div className="detailProduit-wrapper">
                        {result.map((dd) => (
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
                                                    <select name="id_taille" id="" className='select-filter' onChange={(e) => setTaille(e.target.value)}>
                                                        <option className='taille_pla'>Sélectionnez une pointure</option>
                                                        {getTaille?.sort((a, b) => a.taille - b.taille).map((s) => (
                                                            <option value={s.id_taille} key={s.id_taille}>{s.taille}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="filter-product-row"></div>                          
                                            <div className="filter-product">
                                                <div className="filter">
                                                    <AddIcon className="filter-icon" onClick={() => handleQuantity('inc')} />
                                                    <span className="filter-nb">{quantite}</span>
                                                    <RemoveOutlinedIcon className="filter-icon" onClick={() => handleQuantity('desc')} />
                                                </div>
                                                {taille && quantite > stock && <div style={{color:'red', fontSize:"12px"}}>Il ya que {stock} dans le stock pour cette pointure</div>}
                                                <div className="filter">
                                                    <button className="filter-btn" onClick={handleClick} disabled={taille && quantite > stock ? true : false}>Envoyer</button>
                                                    {isLoading && (
                                                        <div className="loader-container loader-container-center">
                                                            <CircularProgress size={28} />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="filter" style={{display: 'flex', gap:'20px'}}>
                                                <label htmlFor="">Livreur</label>
                                                <select name="" id="" className='list_select' onChange={(e) => setLivreur(e.target.value)}>
                                                    <option value="">Sélectionnez un livreur</option>
                                                    {getLivreur.map((dd) => (
                                                        <option value={dd.id}>{`${dd.username}`}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="detail-rows-bottom"> {getCommande && <>
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
            <Modal
                title="Confirmation de la Commande"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Confirmer"
                cancelText="Annuler"
                className="confirmation-modal"
            >
                <h2 className="modal-text">Détails de la commande d'échange</h2>
                <p>Produit : {result[0]?.nom_produit}</p>
                <p>Quantité : {quantite}</p>
                <p>Taille : {taille}</p>
                <p>Prix total : {prix} $</p>
                <p>Livreur : {livreur && getLivreur.find(l => l.id === livreur)?.username}</p>
                <h2>Informations de la commande</h2>
                <p>Commande N° : {idCommande}</p>
                <p>Client : {getCommande?.nom}</p>
                <p>Adresse : {getCommande?.nom_commune}, Av/{getCommande?.avenue}, Q/{getCommande?.quartier}, N° {getCommande?.num}</p>
                <p>Téléphone : {getCommande?.telephone}</p>
            </Modal>
        </>
    );
};

export default EchangeCommande;
