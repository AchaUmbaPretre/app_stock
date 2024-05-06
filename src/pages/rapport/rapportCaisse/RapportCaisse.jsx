import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import RapportMoney from './rapportMoney/RapportMoney'
import RapportInformation from './rapportInformation/RapportInformation'
import config from '../../../config'
import './rapportCaisse.scss'

const RapportCaisse = () => {
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
    
    /*     if (!datas.id_marque || !datas.categorie ) {
          Swal.fire({
            title: 'Error',
            text: 'Veuillez remplir tous les champs requis',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          return;
        } */
        /* try {
          const {data} = await axios.get(`${DOMAIN}/api/commande?date_start=${datas.start_date}&date_end=${datas.end_date}`);
          getProduits(data)
        } catch (err) {
          Swal.fire({
            title: 'Error',
            text: err.message,
            icon: 'error',
            confirmButtonText: 'OK',
          });
    
          console.log(err);
        } */
    }

  return (
    <>
        <div className='rapportCaisse'>
            <h1 className='rapport-h1'>Rapport de caisse</h1>
            <div className="rapportCaisse-rows">
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
                    <div className="select-btn" onClick={handleClick}>
                        <SearchOutlined className='select-search-btn'/>
                    </div>
                </div>
            </div>
            <RapportMoney/>
            <RapportInformation/>
        </div>

    </>
  )
}

export default RapportCaisse