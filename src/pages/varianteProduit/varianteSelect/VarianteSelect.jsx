import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from './../../../config';
import Select from 'react-select';
import Swal from 'sweetalert2';

const VarianteSelect = ({getProduits}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [produit, setProduit] = useState([]);
    const [datas, setDatas] = useState({});
    const [getCategorie, setGetCategorie] = useState([]);
    const [getMarque, setGetMarque] = useState([]);
    

    const handleInputChange = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;

        console.log(fieldValue)
      
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
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN]);

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
  }, [DOMAIN]);

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


  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const {data} = await axios.get(`${DOMAIN}/api/produit/listeVarianteProduit?nom_produit=${datas.nom_produit}&id_cat=${datas.categorie}&id_marque=${datas.id_marque}`);
      getProduits(data)
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
                    options={getCategorie?.map(item => ({ value: item.id_categorie, label: item.nom_categorie }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'categorie', value: selectedOption.value } })}
                    placeholder="Choisir une categorie"
                />
                <Select
                    className="product-input-select"
                    name='id_marque'
                    options={getMarque?.map(item => ({ value: item.id_marque, label: item.nom }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'id_marque', value: selectedOption.value } })}
                    placeholder="Choisir une marque"
                />
                <div className="select-btn" onClick={handleClick}>
                    <SearchOutlined className='select-search-btn' />
                </div>
            </div>
        </div>

    </>
  )
}

export default VarianteSelect