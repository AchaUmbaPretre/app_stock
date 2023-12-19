import React, { useEffect, useRef, useState } from 'react';
import './productSelects.scss'
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from './../../../config';
import Select from 'react-select';
import Swal from 'sweetalert2';

const ProductSelects = ({getProduits}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [produit, setProduit] = useState([]);
    const [datas, setDatas] = useState({});
    const [loading, setLoading] = useState(true);
    const [getCategorie, setGetCategorie] = useState([]);
    const [couleur, setCouleur] = useState([]);
    

    const handleInputChange = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
      
        let updatedValue = fieldValue;
      
        if (fieldName === "contact_email") {
          updatedValue = fieldValue.toLowerCase();
        } else if (Number.isNaN(Number(fieldValue))) {
          updatedValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
        }
      
      setDatas((prev) => ({ ...prev, [fieldName]: updatedValue }));
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
        const { data } = await axios.get(`${DOMAIN}/api/produit/couleur`);
        setCouleur(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/produit/categorie`);
        setGetCategorie(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);


  const handleClick = async (e) => {
    e.preventDefault();

    if (!datas.nom_produit || !datas.categorie ) {
      Swal.fire({
        title: 'Error',
        text: 'Veuillez remplir tous les champs requis',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    try {
      const {data} = await axios.get(`${DOMAIN}/api/produit/produitSelect?nom_produit=${datas.nom_produit}&categorie=${datas.categorie}&prix=${datas.prix}&couleur=${datas.couleur}`);
      getProduits(data)
      setLoading(false)
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'OK',
      });

      console.log(err);
    }
}

  return (
    <>
        <div className="productSelects">
            <div className="productSelects-container">
                <Select
                    className="product-input-select"
                    name='produit_id'
                    options={produit?.map(item => ({ value: item.nom_produit, label: item.nom_produit }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'nom_produit', value: selectedOption.value } })}
                    placeholder="Choisir un produit"
                />
                 <Select
                    className="product-input-select"
                    name='categorie'
                    options={getCategorie?.map(item => ({ value: item.id, label: item.nom_categorie }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'categorie', value: selectedOption.value } })}
                    placeholder="Choisir une categorie"
                />
                <Select
                    className="product-input-select"
                    name='couleur'
                    options={couleur?.map(item => ({ value: item.id, label: item.nom_couleur }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'couleur', value: selectedOption.value } })}
                    placeholder="Choisir une couleur"
                />
                <Select
                    className="product-input-select"
                    name='prix'
                    options={produit?.map(item => ({ value: item.prix, label: item.prix }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'prix', value: selectedOption.value } })}
                    placeholder="Prix"
                />
                <div className="select-btn">
                    <SearchOutlined className='select-search-btn' onClick={handleClick} />
                </div>
            </div>
        </div>

    </>
  )
}

export default ProductSelects