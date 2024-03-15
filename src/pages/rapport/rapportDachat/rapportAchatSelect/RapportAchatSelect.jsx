import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import Select from 'react-select';
import config from './../../../../config';
import Swal from 'sweetalert2';

const RapportAchatSelect = ({getProduits}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [datas, setDatas] = useState({});
    const [data, setData] = useState({});
    const [marque, setMarque] = useState([]);

    
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

    console.log(datas)
    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data } = await axios.get(`${DOMAIN}/api/produit/marque`);
          setMarque(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, [DOMAIN]);

    const handleStartDateChange = (e) => {
      const startDate = e.target.value;
      setDatas((prev) => ({ ...prev, start_date: startDate }));
    };
  
    const handleEndDateChange = (e) => {
      const endDate = e.target.value;
      setDatas((prev) => ({ ...prev, end_date: endDate }));
    };

  const handleClick = async (e) => {
    e.preventDefault();

   if (!datas.start_date || !datas.end_date ) {
      Swal.fire({
        title: 'Error',
        text: 'Veuillez remplir tous les champs requis',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    try {
      const {data} = await axios.get(`${DOMAIN}/api/rapport/rapportAchats/achats?start_date=${datas.start_date}&end_date=${datas.end_date}&marque_id=${datas.id_marque}`);
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
                name="id_marque"
                options={marque?.map((item) => ({
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
                <div className="select-btn">
                    <SearchOutlined className='select-search-btn' onClick={handleClick} />
                </div>
            </div>
        </div>

    </>
  )
}

export default RapportAchatSelect