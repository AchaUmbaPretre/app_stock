import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from './../../config';
import Swal from 'sweetalert2';

const DetteSelect = ({getProduits}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [datas, setDatas] = useState({});
    

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
      const {data} = await axios.get(`${DOMAIN}/api/vente/vente/dette?start_date=${datas.start_date}&end_date=${datas.end_date}`);
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
                    <SearchOutlined className='select-search-btn' />
                </div>
            </div>
        </div>

    </>
  )
}

export default DetteSelect