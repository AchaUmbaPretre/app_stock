import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from './../../../config';
import Swal from 'sweetalert2';

const RapportClientSelect = ({getProduits,setStart_date,setEnd_date,start_date,end_date}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [datas, setDatas] = useState({});
    const [qteOne, setQteOne] = useState('');
    const [qteTwo, setQteTwo] = useState('');
    

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

    const handleChange1 = (e) => {
      const qteOne = e.target.value;
      setQteOne(qteOne);
    };

    const handleChange2 = (e) => {
      const qteTwo = e.target.value;
      setQteTwo(qteTwo);
    };

  const handleClick = async (e) => {
    e.preventDefault();
/* 
   if (!datas.start_date || !datas.end_date ) {
      Swal.fire({
        title: 'Error',
        text: 'Veuillez remplir tous les champs requis',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    } */

    try {
      const {data} = await axios.get(`${DOMAIN}/api/rapport/rapportClient/venteClient?start_date=${start_date}&end_date=${end_date}&qteOne=${qteOne}&qteTwo=${qteTwo}`);
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
              placeholder='Entrer la date end'
            />
            <input
              type="number"
              className="product-input-select"
              name="qteOne"
              style={{ border: '1px solid #c7c7c7', cursor: 'pointer' }}
              onChange={handleChange1}
              placeholder='Entrez la quantité'
            />
            <input
              type="number"
              className="product-input-select"
              name="qteTwo"
              style={{ border: '1px solid #c7c7c7', cursor: 'pointer' }}
              onChange={handleChange2}
              placeholder='Entrez la quantité'
            />
                <div className="select-btn" onClick={handleClick}>
                    <SearchOutlined className='select-search-btn' />
                </div>
            </div>
        </div>

    </>
  )
}

export default RapportClientSelect