import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from '../../../../config';
import Swal from 'sweetalert2';

const RapportVenteAllSelects = ({ getProduits,id }) => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [datas, setDatas] = useState({});

  const handleClick = async (e) => {
    e.preventDefault();
  
    try {
  
      const { data } = await axios.get(
        `${DOMAIN}/api/rapport/rapport/venteAllSearch?id_marque=${id}&start_date=${datas.start_date}&end_date=${datas.end_date}`
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
          <input
            type="date"
            className="product-input-select"
            name="start_date"
            style={{ border: '1px solid #c7c7c7', cursor: 'pointer' }}
            onChange={handleStartDateChange}
          />
          <input
            type="date"
            className="product-input-select"
            name="end_date"
            style={{ border: '1px solid #c7c7c7', cursor: 'pointer' }}
            onChange={handleEndDateChange}
          />
          <div className="select-btn">
            <SearchOutlined className="select-search-btn" onClick={handleClick} />
          </div>
        </div>
      </div>
    </>
  );
};

export default RapportVenteAllSelects