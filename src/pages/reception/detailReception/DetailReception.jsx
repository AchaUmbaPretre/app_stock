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
    const [getTaille,setGetTaille] = useState([]);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const id = pathname.split('/')[2];
    const [inventaire, setInventaire] = useState([]);
    const [loading, setLoading] = useState(true);
    const [variante, setVariante] = useState([]);
    const [inventaireTotalOne, setInventaireTotalOne] = useState([]);
    const [prix, setPrix] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [vPays, setVpays] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const scroll = { x: 400 };

    const handleCheckboxChange = (id) => {
        const selectedRecord = getTaille?.find((record) => record.id_taille === id);
        if (selectedIds.includes(id)) {
          setSelectedIds(selectedIds.filter((selectedId) => selectedId !== id));
          setSelectedData(selectedData.filter((record) => record.id !== id));
        } else {
          setSelectedIds([...selectedIds, id]);
          setSelectedData([...selectedData, selectedRecord]);
        }
    };

    const handleStockChange = (e, id) => {
        const updatedData = selectedData.map((record) => {
          if (record.id_taille === id) {
            return { ...record, stock: e.target.value };
          }
          return record;
        });
        setSelectedData(updatedData);
      };


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

       
      const qTable = [
        {
          title: 'Pointure',
          dataIndex: 'taille',
          width: '25%',
          render: (record) => {
            return (
              <input
                disabled
                type="number"
                className='input-timeBar'
                value={record}
              />
            );
          }
        },
        {
          title: 'Quantité',
          dataIndex: 'stock',
          key: 'stock',
          width: '25%',
          render: (text, record) => {
            const selectedRecord = selectedData.find((selectedRecord) => selectedRecord.id_taille === record.id_taille);
            return (
              <input
                type="number"
                name='stock'
                className='input-stock'
                onChange={(e) => handleStockChange(e, record.id_taille)}
                disabled = {selectedRecord ? false : true}
                min={0}
              />
            );
          }
        },
        {
          title: 'Sélectionner',
          dataIndex: 'id_taille',
          width: '25%',
          render: (text, record) => {
            const isChecked = selectedIds.includes(record.id_taille);
            return (
              <>
                {isChecked ? (
                  <ToggleOnIcon
                    color="primary"
                    style={{ fontSize: '40px', cursor: 'pointer' }}
                    onClick={() => handleCheckboxChange(record.id_taille)}
                  />
                ) : (
                  <ToggleOffIcon
                    color="disabled"
                    style={{ fontSize: '40px', cursor: 'pointer' }}
                    onClick={() => handleCheckboxChange(record.id_taille)}
                  />
                )}
              </>
            );
          },
        },
      ];

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

      useEffect(() => {
        setVpays(data[0]?.id_pays);
      }, [data[0]?.id_pays]);

      console.log(vPays)
      
      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/tailleOne/${vPays}`);
            setGetTaille(data)

          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,vPays]);

      const handleClick = async (e) => {
        e.preventDefault();
      
        if (!data[0]?.id_pays || !data[0]?.id_couleur || !data[0]?.code_variant || !data[0]?.img || !selectedData || selectedData.length === 0) {
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
      
            const filteredSelectedData = selectedData.filter((item) => item.id_taille !== null && item.id_taille !== undefined);
      
            const requestData = {
              id_produit: data[0]?.id_produit,
              id_pays: data[0]?.id_pays,
              id_couleur: data[0]?.id_couleur,
              code_variant: data[0]?.code_variant,
              img: data[0]?.img,
              id_cible: data[0]?.id_cible,
              id_famille: data[0]?.id_famille,
              prix: data[0]?.prix
            };
      
            for (const dd of filteredSelectedData) {
              const response = await axios.post(`${DOMAIN}/api/produit/varianteProduitEntree`, { ...requestData, id_taille: dd.id_taille, stock: dd.stock });
            }
      
            Swal.fire({
              title: 'Succès',
              text: 'Produit créé avec succès !',
              icon: 'success',
              confirmButtonText: 'OK',
            });
      
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
                                <Table columns={qTable} dataSource={getTaille} className="presenceTable" loading={loading} scroll={scroll} style={{marginTop: '50px'}}/>
                                <div className="btn-reception">
                                    <button onClick={handleClick} className="btn-valide" style={{ padding: "8px 10px", background: "royalblue", border: "none", color: "#fff", fontSize:"12px", cursor:'pointer', borderRadius: "5px"}}>Envoyer</button>
                                </div>
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