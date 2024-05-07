import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import RapportMoney from './rapportMoney/RapportMoney'
import RapportInformation from './rapportInformation/RapportInformation'
import config from '../../../config'
import './rapportCaisse.scss'

const RapportCaisse = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [start_date, setStart_date] = useState(null);
    const [end_date, setEnd_date ] = useState(null);


    const handleStartDateChange = (e) => {
        const startDate = e.target.value;
        setStart_date(startDate);
      };
      
    const handleEndDateChange = (e) => {
        const endDate = e.target.value;
        setEnd_date(endDate);
      };

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
                </div>
            </div>
            <RapportMoney start_date={start_date} end_date={end_date}/>
            <RapportInformation start_date={start_date} end_date={end_date}/>
        </div>
    </>
  )
}

export default RapportCaisse