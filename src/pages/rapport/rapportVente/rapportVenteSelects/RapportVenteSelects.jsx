import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../../../../config';
import Select from 'react-select';
import Swal from 'sweetalert2';

const RapportVenteSelects = ({ getProduits,setStart_date, setEnd_date,start_date, end_date}) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [datas, setDatas] = useState({});
  const [getMarque, setGetMarque] = useState([]);
  const [couleur, setCouleur] = useState([]);
  const [taille, setTaille] = useState([])

  const handleInputChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    let updatedValue = fieldValue;

    if (fieldName === 'contact_email') {
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
        const { data } = await axios.get(`${DOMAIN}/api/produit/tailleAll`);
        setTaille(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN]);

  const handleStartDateChange = (e) => {
    const startDate = e.target.value;
    setDatas((prev) => ({ ...prev, start_date: startDate }));
    setStart_date(startDate)
  };

  const handleEndDateChange = (e) => {
    const endDate = e.target.value;
    setDatas((prev) => ({ ...prev, end_date: endDate }));
    setEnd_date(endDate)
  };

  const handleClick = async (e) => {
    e.preventDefault();
  
    try {
      const marqueIds = Array.isArray(datas.id_marque)
        ? datas.id_marque.join(',')
        : datas.id_marque;
  
      const { data } = await axios.get(
        `${DOMAIN}/api/rapport/rapport/venteV?start_date=${start_date}&end_date=${end_date}&marque_id=${marqueIds}&couleur_id=${datas.id_couleur}&taille_id=${datas.id_taille}`
      );
  
      getProduits(data);
    } catch (err) {
      Swal.fire({
        title: 'Error',
        text: err.response.data.error,
        icon: 'error',
        confirmButtonText: 'OK',
      });
  
      console.log(err);

      console.log(datas)
    }
  };

  return (
    <>
      <div className="productSelects">
        <div className="productSelects-container">
          <Select
            className="product-input-select"
            name="id_marque"
            options={getMarque?.map((item) => ({
              value: item.id_marque,
              label: item.nom,
            }))}
            onChange={(selectedOption) =>
              handleInputChange({
                target: { name: 'id_marque', value: selectedOption?.value },
              })
            }
            placeholder="Choisir une marque"
          />
          <Select
            className="product-input-select"
            name="id_couleur"
            options={couleur?.map((item) => ({
              value: item.id_couleur,
              label: item.description,
            }))}
            onChange={(selectedOption) =>
              handleInputChange({
                target: { name: 'id_couleur', value: selectedOption?.value },
              })
            }
            placeholder="Choisir une couleur"
          />
          <Select
            className="product-input-select"
            name="id_taille"
            options={taille?.map((item) => ({
              value: item.id_taille,
              label: item.taille,
            }))}
            onChange={(selectedOption) =>
              handleInputChange({
                target: { name: 'id_taille', value: selectedOption?.value },
              })
            }
            placeholder="Choisir une taille"
          />
          <input
            type="date"
            className="product-input-select"
            name="start_date"
            style={{ border: '1px solid #c7c7c7', cursor: 'pointer' }}
            onChange={handleStartDateChange}
          />
          au
          <input
            type="date"
            className="product-input-select"
            name="end_date"
            style={{ border: '1px solid #c7c7c7', cursor: 'pointer' }}
            onChange={handleEndDateChange}
          />
          <div className="select-btn" onClick={handleClick}>
            <SearchOutlined className="select-search-btn" />
          </div>
        </div>
      </div>
    </>
  );
};

export default RapportVenteSelects;