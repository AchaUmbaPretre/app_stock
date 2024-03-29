import React, { useEffect, useState } from 'react';
import './productSelects.scss'
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from './../../../config';
import Select from 'react-select';
import Swal from 'sweetalert2';

const ProductSelects = ({getProduits}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getMarque, setGetMarque] = useState([]);
    const [datas, setDatas] = useState({});
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
        const { data } = await axios.get(`${DOMAIN}/api/produit/couleur`);
        setCouleur(data);
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

  const handleClick = async (e) => {
    e.preventDefault();

/*     if (!datas.id_marque || !datas.categorie ) {
      Swal.fire({
        title: 'Error',
        text: 'Veuillez remplir tous les champs requis',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    } */
    try {
      const {data} = await axios.get(`${DOMAIN}/api/produit?id_marque=${datas.id_marque}&categorie=${datas.categorie}`);
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
                    name='id_marque'
                    options={getMarque?.map(item => ({ value: item.id_marque, label: item.nom }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'id_marque', value: selectedOption.value } })}
                    placeholder="Choisir une marque"
                />
                 <Select
                    className="product-input-select"
                    name='categorie'
                    options={getCategorie?.map(item => ({ value: item.id_categorie, label: item.nom_categorie }))}
                    onChange={selectedOption => handleInputChange({ target: { name: 'categorie', value: selectedOption.value } })}
                    placeholder="Choisir une categorie"
                />
                <div className="select-btn" onClick={handleClick}>
                    <SearchOutlined className='select-search-btn' />
                </div>
            </div>
        </div>

    </>
  )
}

export default ProductSelects