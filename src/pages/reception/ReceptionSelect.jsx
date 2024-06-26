import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from './../../config';
import Swal from 'sweetalert2';

const ReceptionSelect = ({getProduits}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [start_date, setStart_date] = useState('');
    const [end_date, setEnd_date ] = useState('');

    const handleStartDateChange = (e) => {
      const startDate = e.target.value;
      setStart_date(startDate);
    };
  
    const handleEndDateChange = (e) => {
      const endDate = e.target.value;
      setEnd_date(endDate);
    };

  const handleClick = async (e) => {
    e.preventDefault();

/*    if (!datas.start_date || !datas.end_date ) {
      Swal.fire({
        title: 'Error',
        text: 'Veuillez remplir tous les champs requis',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    } */
    try {
      const {data} = await axios.get(`${DOMAIN}/api/produit/reception?start_date=${start_date}&end_date=${end_date}`);
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

export default ReceptionSelect