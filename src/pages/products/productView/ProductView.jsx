import React from 'react'
import './productView.scss'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import config from '../../../config'
import axios from 'axios'
import { useEffect } from 'react'
import Select from 'react-select';
import { format } from 'date-fns'
import moment from 'moment';
import { Image, Table } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import Swal from 'sweetalert2'
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';

const ProductView = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getProduit, setGetProduit] = useState([]);
    const [data, setData] = useState([]);
    const [getCouleur,setGetCouleur] = useState([]);
    const [getPays,setGetPays] = useState([]);
    const [getTaille,setGetTaille] = useState([]);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const id = pathname.split('/')[2];
    const [idCible,setIdcible] = useState();
    const [idFamille, setIdFamille] = useState();
    const [idPays, setIdPays] = useState([]);
    const [idTaille, setIdTaille] = useState({});
    const [selectedIds, setSelectedIds] = useState([]);
    const [pointureId, setPointureId] = useState([]);
    const [stockId, setStockId] = useState('');
    const searchInput = React.useRef(null);
    const scroll = { x: 400 };
    const scrollY = { y: 200 };
    const [selectedData, setSelectedData] = useState([]);

    const handleInputChange = async (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
      
        let updatedValue = fieldValue;
      
        if (fieldName === "img") {
          const file = e.target.files[0];
          const reader = new FileReader();
      
          reader.onload = () => {
            const base64File = reader.result;
            updatedValue = base64File;
            setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
          };
      
          reader.onerror = (error) => {
            console.error("Erreur de lecture du fichier :", error);
          };
      
          reader.readAsDataURL(file);
        } else if (fieldName === "contact_email") {
          updatedValue = fieldValue.toLowerCase();
        } else if (Number.isNaN(Number(fieldValue))) {
          if (typeof fieldValue === "string" && fieldValue.length > 0) {
            updatedValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
          }
        }
      
        setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
      };
      console.log(stockId)


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

      console.log(data)
      

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/produit/${id}`);
            setGetProduit(data[0])

          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [id]);

      useEffect(()=>{
        setIdcible(getProduit?.id_cible)
        setIdFamille(getProduit?.id_famille)
        setIdPays(data?.id_pays)
      },[getProduit?.id_cible, data?.id_pays])

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
      }, []);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/pays`);
            setGetPays(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/tailleOne/${idPays}`);
            setGetTaille(data)

          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [idPays]);

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
            const selectedRecord = selectedData.find((selectedRecord) => selectedRecord.id === record.id_taille);
            return (
              <input
                type="number"
                name='stock'
                className='input-stock'
                onChange={(e) => handleStockChange(e, record.id_taille)}
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

      const handleClick = (e) => {
        e.preventDefault();
      
        if ((Array.isArray(selectedData) && selectedData.length > 0)) {
          Promise.all(
            selectedData?.map((item) =>
              axios.post(`${DOMAIN}/api/produit/varianteProduit`, {
                ...data,
                id_produit: id,
                id_cible: item.id_cible,
                id_taille: item.id_taille,
                id_famille: item.id_famille,
                stock: item.stock
              })
            )
          )
            .then(() => {
              Swal.fire({
                title: 'Success',
                text: 'Produit créé avec succès!',
                icon: 'success',
                confirmButtonText: 'OK',
              });
      
              navigate('/varianteProduit');
              window.location.reload();
            })
            .catch((err) => {
              Swal.fire({
                title: 'Error',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'OK',
              });
            });
        } else {
          console.error('idTaille is not an array');
        }
      };

      const formattedDatEntrant = moment(getProduit?.date_entree).format('DD-MM-YYYY');

  return (
    <>
        <div className="productView">
            <div className="product-wrapper">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Detail du produit</h2>
                        <span>Voir les details</span>
                    </div>
                </div>
                <div className="product-bottom">
                    <div className="product-view-left">
                        <table>
                            <tr>
                                <th scope="col">Titre</th>
                                <th scope="col">Détail</th>
                            </tr>
                            <tr>
                                <th scope="row">Produit</th>
                                <td>{getProduit?.nom_produit}</td>
                            </tr>
                            <tr>
                                <th scope="row">Catégorie</th>
                                <td>{getProduit?.nom_categorie}</td>
                            </tr>
                            <tr>
                                <th scope="row">Matière</th>
                                <td>{getProduit?.nom_matiere}</td>
                            </tr>
                            <tr>
                                <th scope="row">Prix</th>
                                <td>{getProduit?.prix} $</td>
                            </tr>
                            <tr>
                                <th scope="row">Marque</th>
                                <td>{getProduit?.nom_marque}</td>
                            </tr>
                            <tr>
                                <th scope="row">Cible</th>
                                <td>{getProduit?.nom_cible}</td>
                            </tr>
                            <tr>
                                <th scope="row">Famille</th>
                                <td>{getProduit?.nom_famille}</td>
                            </tr>
                            <tr>
                                <th scope="row">Date d'entrée</th>
                                <td>{formattedDatEntrant}</td>
                            </tr>
                        </table>
                        <div className="product_view_form">
                            <h2 className="product-h2">Ajoutez des informations</h2>
                            <div className="product_view_wrapper">
                                <div className="produit-view-control">
                                    <label htmlFor="">Pays</label>
                                    <Select
                                        name="id_pays"
                                        placeholder="sélectionnez un pays"
                                        options={getPays?.map(item => ({ value: item.id_pays, label: item.code_pays }))}
                                        onChange={selectedOption => handleInputChange({ target: { name: 'id_pays', value: selectedOption.value } })}
                                    />
                                </div>
{/*                                 <div className="produit-view-control">
                                    <label htmlFor="">Taille</label>
                                    <Select
                                      name="id_taille"
                                      placeholder="Sélectionnez des tailles"
                                      isMulti
                                      options={getTaille?.map((item) => ({ value: item.id_taille, label: item.taille }))}
                                      onChange={(selectedOptions) => handleInputChange1({ target: { name: 'id_taille', value: selectedOptions } })}
                                    />
                                </div> */}
                                <div className="produit-view-control">
                                    <label htmlFor="">Couleur</label>
                                    <Select
                                      name="id_couleur"
                                      placeholder="sélectionnez une couleur"
                                      options={getCouleur?.map(item => ({ value: item.id_couleur, label: item.description }))}
                                      onChange={selectedOption => handleInputChange({ target: { name: 'id_couleur', value: selectedOption.value } })}
                                    />
                                </div>
{/*                                 <div className="produit-view-control">
                                    <label htmlFor="">Stock</label>
                                    <input type="number" name='stock' className="produit_input" placeholder='Entrez la quantité du produit' onChange={handleInputChange} />
                                </div> */}
                                <div className="produit-view-control">
                                    <label htmlFor="">Prix</label>
                                    <input type="number" name='prix' className="produit_input" onChange={handleInputChange} />
                                </div>
                                <div className="produit-view-control">
                                    <label htmlFor="">Code Variant</label>
                                    <input type="text" className="produit_input" name='code_variant' placeholder='Entrez le code variant...' onChange={handleInputChange} />
                                </div>
                            </div>
                            <button className="produit_submit" onClick={handleClick}>Soumettre</button>
                        </div>
                    </div>
                    <div className="product-view-right">
                        <h2 className="product-h2">L'image</h2>
                        <div className="product-img-row">
                            {data.img ? (
                            <div>
                                <Image
                                    className="product-img"
                                    width={200}
                                    height={200}
                                    src="error"
                                    fallback={data?.img}
                                />
                            </div>
                            ) : (
                                <div>
                                <input
                                type="file"
                                name="img"
                                className="form-input"
                                style={{ display: "none" }}
                                label="Profil"
                                id="file-upload"
                                accept=".jpeg, .png, .jpg"
                                onChange={handleInputChange}
                                />
                                <div className="form-file" onClick={() => document.getElementById('file-upload').click()}>
                                <CloudUploadOutlined className="cloud-icon" />
                                <span>Glissez et déposez un fichier à télécharger</span>
                                </div>
                            </div>
                            )}
                        </div>
                        <Table columns={qTable} dataSource={getTaille} className="presenceTable" scroll={scroll} pagination={{ pageSize: 6}}/>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default ProductView