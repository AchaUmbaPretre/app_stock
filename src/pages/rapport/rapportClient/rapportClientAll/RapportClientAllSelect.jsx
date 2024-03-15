import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../../../../config';
import Select from 'react-select';
import Swal from 'sweetalert2';

const RapportClientAllSelect = ({ getProduits }) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [datas, setDatas] = useState({});
  const [getClient, setGetClient] = useState([]);

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
        const { data } = await axios.get(`${DOMAIN}/api/client`);
        setGetClient(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN]);

  const handleClick = async (e) => {
    e.preventDefault();
  
    try {
      const clientIds = Array.isArray(datas.id_client)
        ? datas.id_client.join(',')
        : datas.id_client;
  
      const { data } = await axios.get(
        `${DOMAIN}/api/rapport/rapportClient/venteClientAll?start_date=${datas.start_date}&end_date=${datas.end_date}&id_client=${clientIds}`
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
    }
  };
  const handleStartDateChange = (e) => {
    const startDate = e.target.value;
    setDatas((prev) => ({ ...prev, start_date: startDate }));
  };

  const handleEndDateChange = (e) => {
    const endDate = e.target.value;
    setDatas((prev) => ({ ...prev, end_date: endDate }));
  };

  return (
    <>
      <div className="productSelects">
        <div className="productSelects-container">
          <Select
            className="product-input-select"
            name="id_marque"
            options={getClient?.map((item) => ({
              value: item.id,
              label: item.nom,
            }))}
            onChange={(selectedOption) =>
              handleInputChange({
                target: { name: 'id_client', value: selectedOption?.value },
              })
            }
            placeholder="Choisir un(e) client(e)"
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

export default RapportClientAllSelect;