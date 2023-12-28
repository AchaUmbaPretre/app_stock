import React, { useState } from 'react'
import Select from 'react-select';
import { useEffect } from 'react';
import config from '../../../config';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './formMouvement.scss'
import { Button, Input, Space, Table, Popconfirm, Popover} from 'antd';

const FormMouvement = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [selectionType, setSelectionType] = useState('checkbox');
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [client, setClient] = useState([]);
    const [livreur, setLivreur] = useState([]);
    const [produit, setProduit] = useState([]);
    const [typeMouvement, setTypeMouvement] = useState([]);
    const [variante, setVariante] = useState([]);
    const [idVariante, setIdVariante] = useState();
    const scroll = { x: 400 };
    const [getCouleur,setGetCouleur] = useState([]);
    const [getProduitVariant,setGetProduitVariant] = useState([]);

    const columns = [
        {
            title: 'Code',
            dataIndex: 'id_varianteProduit',
            key: 'id_varianteProduit',
        },
        {
            title: 'Marque',
            dataIndex: 'nom_marque',
            key: 'nom_marque'
        },
        {
            title: 'stock',
            dataIndex: 'stock',
            key: 'stock'
        },
        {
            title: 'Couleur',
            dataIndex: 'description',
            key: 'description'
        },
        {
            title: 'Pointure',
            dataIndex: 'pointure',
            key: 'pointure'
        }
    ];

    const handleInputChange = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
      
        let updatedValue = fieldValue;
      
        if (fieldName === "contact_email") {
          updatedValue = fieldValue ? fieldValue.toLowerCase() : ""; // Vérification si fieldValue n'est pas undefined ou une chaîne vide
        } else if (Number.isNaN(Number(fieldValue))) {
          updatedValue = fieldValue && fieldValue.length > 0 ? fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1) : ""; // Vérification si fieldValue n'est pas undefined, une chaîne vide ou une chaîne de longueur 0
        }
      
        setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
        setIdVariante((prev) => ({ ...prev, [fieldName]: updatedValue }).id_produit)
      };

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`${DOMAIN}/api/produit`);
          setProduit(data);
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
          const { data } = await axios.get(`${DOMAIN}/api/client`);
          setClient(data);
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
          const { data } = await axios.get(`${DOMAIN}/api/produit/typeMouvement`);
          setTypeMouvement(data);
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
            const { data } = await axios.get(`${DOMAIN}/api/produit/mouvementVariante/${idVariante}`);
            setVariante(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [idVariante])

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


    const handleClick = async (e) => {
      e.preventDefault();
  
      try{
        await axios.post(`${DOMAIN}/api/produit/mouvement`, data)
        Swal.fire({
          title: 'Success',
          text: 'Mouvement crée avec succès!',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        navigate('/ventes')
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
        <div className="clientForm">
          <div className="product-container">
            <div className="product-container-top">
              <div className="product-left">
                <h2 className="product-h2">Ajouter un nouveau mouvement</h2>
                <span>Créer un nouveau mouvement</span>
              </div>
            </div>
            <div className="formMouvementRows">
                <div className="product-wrapper">
                <div className="product-container-bottom">
                    <div className="form-controle">
                        <label htmlFor="">Produit</label>
                        <Select
                            name='id_produit'
                            options={produit?.map(item => ({ value: item.id_produit, label: item.nom_produit }))}
                            onChange={selectedOption => handleInputChange({ target: { name: 'id_produit', value: selectedOption.value } })}
                        />
                    </div>
                    <div className="form-controle">
                        <label htmlFor="">Code</label>
                        <Select
                            name='id_varianteProduit'
                            options={variante?.map(item => ({ value: item.id_varianteProduit, label: item.id_varianteProduit }))}
                            onChange={selectedOption => handleInputChange({ target: { name: 'id_varianteProduit', value: selectedOption.value } })}
                        />
                    </div>
                    <div className="form-controle">
                        <label htmlFor="">Client</label>
                        <Select
                            name='id_client'
                            options={client?.map(item => ({ value: item.id, label: item.nom }))}
                            onChange={selectedOption => handleInputChange({ target: { name: 'id_client', value: selectedOption.value } })}
                        />
                    </div>
                    <div className="form-controle">
                        <label htmlFor="">Couleur</label>
                        <Select
                            name='id_client'
                            options={getCouleur?.map(item => ({ value: item.id_couleur, label: item.description }))}
                            onChange={selectedOption => handleInputChange({ target: { name: 'id_couleur', value: selectedOption.value } })}
                        />
                    </div>
                    <div className="form-controle">
                        <label htmlFor="">Pointure</label>
                        <Select
                            name='id_taille'
                            options={variante?.map(item => ({ value: item.id_taille, label: item.pointure }))}
                            onChange={selectedOption => handleInputChange({ target: { name: 'id_taille', value: selectedOption.value } })}
                        />
                    </div>
                    <div className="form-controle">
                        <label htmlFor="">Type de mouvement</label>
                        <Select
                            name='id_type_mouvement '
                            options={typeMouvement?.map(item => ({ value: item.id_type_mouvement , label: item.type_mouvement }))}
                            onChange={selectedOption => handleInputChange({ target: { name: 'id_type_mouvement', value: selectedOption.value } })}
                        />
                    </div>
                    <div className="form-controle">
                        <label htmlFor="">Quantité</label>
                        <input type="number" className="form-input" name='quantite' onChange={handleInputChange} placeholder='ex: 10'  required/>
                    </div>
                    <div className="form-controle">
                        <label htmlFor="">Description</label>
                        <textarea type="text" className="form-input form-desc" name='description' placeholder='Ecrire la description' onChange={handleInputChange}  required/>
                    </div>
                </div>
                <div className="form-submit">
                    <button className="btn-submit" onClick={handleClick}>Soumetre</button>
                    <button className="btn-submit btn-annuler">Annuler</button>
                </div>
                </div>
                <div className="mouvement-left">
                    <h2 className="mouvement-title">Détail</h2>
                    <div className="mouvement-info-detail">
                        <Table columns={columns} dataSource={variante} loading={loading} scroll={scroll} pagination={{ pageSize: 5}} />
                    </div>
                </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default FormMouvement