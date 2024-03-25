import { Link, useLocation, useNavigate } from 'react-router-dom';
import config from '../../../config';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Rate } from 'antd';
import moment from 'moment';
import { FadeLoader } from 'react-spinners';
import { Image, Table } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import { CircularProgress } from '@mui/material';

const DetailReception = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [data, setData] = useState([]);
    const [produitId, setProduitId] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const id = pathname.split('/')[2];
    const [inventaire, setInventaire] = useState([]);
    const [loading, setLoading] = useState(true);
    const [variante, setVariante] = useState([]);
    const [inventaireTotalOne, setInventaireTotalOne] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/varianteDetail/${id}`);
            setData(data);
            setLoading(false)
            setVariante(data[0]?.code_variant);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,id]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/inventaire/${variante}`);
            setInventaire(data);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,variante]);

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

    const tailleMinObjet1 = inventaire[0]?.taille_min;
    const dernierObjet = inventaire[inventaire.length - 1];
    const tailleMaxDernierObjet = dernierObjet?.taille_max;

    const groupedData = data.reduce((acc, item) => {
    const { id_produit, nom_produit, pointure, date_entrant, nom_marque, nom_categorie, nom_matiere, nom_cible, code_pays, description, prix, nom_famille,code_variant,stock, img } = item;
      
    if (!acc[id_produit]) {
          acc[id_produit] = { id_produit, nom_produit, pointure: [], date_entrant, nom_marque, nom_categorie, nom_matiere, nom_cible, code_pays, description, prix, nom_famille,code_variant, stock, img };
        }
      
        acc[id_produit].pointure.push(pointure);
        return acc;
        }, {});
      const result = Object.values(groupedData);

      const handleClick = async (e) => {
        e.preventDefault();
      
        if (!data.id_pays || !data.id_couleur || !data.code_variant || !data.img || selectedData.length === 0) {
          Swal.fire({
            title: 'Erreur',
            text: 'Veuillez remplir tous les champs requis',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return;
        }
      
        if (Array.isArray(selectedData) && selectedData.length > 0) {
          try {
            setIsLoading(true);
      
            const requests = selectedData.map((item) => {
              const formData = new FormData();
              formData.append('id_pays', data.id_pays);
              formData.append('id_couleur', data.id_couleur);
              formData.append('code_variant', data.code_variant);
              formData.append('img', data.img);
              formData.append('id_produit', produitId?.id_produit);
              formData.append('id_cible', item.id_cible);
              formData.append('id_taille', item.id_taille);
              formData.append('id_famille', item.id_famille);
              formData.append('stock', item.stock);
              formData.append('prix', prix);
      
              return axios.post(`${DOMAIN}/api/produit/varianteProduitEntree`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              });
            });
      
            await Promise.all(requests);
      
            Swal.fire({
              title: 'Succès',
              text: 'Produit créé avec succès !',
              icon: 'success',
              confirmButtonText: 'OK',
            });
      
            navigate('/varianteProduit');
            window.location.reload();
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
        } else {
          console.error('idTaille is not an array');
        }
      };

  return (
    <>
        <div className="pageDetails">
            <div className="pageDetail-wrapper">
            { loading ? (
              <div className="spinner-container">
                <FadeLoader color={'#36D7B7'} loading={loading} />
              </div>
            ) : (
              <div className="pageDetail-container">
                    <div className="pageDetail-left">
                    { result?.map((dd)=>(
                      <div style={{position: 'relative', width:"400px"}}>
                        <img src={`${DOMAIN}${dd.img}`} alt="" className="pageDetail-img" /> 
                      </div> ))}
                        <div className="pageDetail-left-wrapper" id='description'>
                            <h2>Description</h2>
                            { result?.map((dd)=>(
                            <ul>
                                <li><strong>Nom produit : </strong>{dd?.nom_produit}</li>
                                <li><strong>Code variant : </strong>{dd?.code_variant}</li>
                                <li><strong>Matière : </strong>{dd?.nom_matiere}</li>
                                <li><strong>Marque : </strong>{dd?.nom_marque}</li>
                                <li><strong>Categorie : </strong>{dd?.nom_categorie}</li>
                                <li><strong>Famille : </strong>{dd?.nom_famille}</li>
                                <li><strong>Couleur : </strong><span className={`${dd?.description}`}></span><span>{dd?.description}</span></li>
                                <li><strong>Cible : </strong>{dd?.nom_cible}</li>
                                <li><strong>Code pays : </strong>{dd?.code_pays}</li>
                                <li><strong><span>{dd?.nom_famille === 'Chaussure' ? 'Pointure': "Taille"}</span> : </strong> { tailleMinObjet1 === tailleMaxDernierObjet ? `${tailleMinObjet1}`: `${tailleMinObjet1} à ${tailleMaxDernierObjet}`}</li>
                                <li><strong>Date d'entrée : </strong>{moment(dd?.date_entrant).format('DD-MM-YYYY')}</li>
                            </ul> ))}
                        </div>
                    </div>
                    { result?.map((dd)=>(
                    <div className="pageDetail-right">
                        <h2 className="pageDetail-h2">{dd?.nom_marque}</h2>
                        <div className="pagedetailDescr">
                            <span>{dd?.code_pays}</span>
                            <a href='#description'>En savoir plus</a>
                        </div>
                        <div className="pageEtoile-row">
                            <Rate allowHalf defaultValue={3.5} />
                            <Link>Voir le seul avis</Link>
                        </div>
                        <div className="pageDetail-bottom">
                        </div>
                        <div className="pageDetail-rows-prix">
                            <div className="pageDetail-row-prix">
                                <h3>Prix {dd?.prix} $</h3>
                                <span>Il y a {inventaireTotalOne} articles en stock pour cette combinaison</span>
                            </div>
                            <div className="detail-inventaire">
                                <h2 className="detail-h2">INVENTAIRE</h2>
                                <table>
                                    <tr>
                                        <th>Pointure {dd?.code_pays} </th>
                                        <th>Quantité</th>
                                    </tr>
                                    {inventaire.map((dd)=>(
                                    <tr>
                                        <td>{dd.taille}</td>
                                        <td>{dd.nombre_de_paires}</td>
                                    </tr>))}
                                </table>
                            </div>
                        </div>
                    </div>))}
                </div>
              )}
            </div>
        </div>
    </>
  )
}

export default DetailReception