import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from 'antd';
import RapportMoney from './rapportMoney/RapportMoney';
import RapportInformation from './rapportInformation/RapportInformation';
import config from '../../../config';
import './rapportCaisse.scss';

const { RangePicker } = DatePicker;

const RapportCaisse = () => {
    const [dates, setDates] = useState(['', '']);

    const formatDate = (date) => date ? date.format('YYYY-MM-DD') : null;

    const handleDateChange = (dates) => {
        setDates(dates.map(formatDate));
    };

    const [start_date, end_date] = dates;


    return (
        <div className='rapportCaisse'>
            <h1 className='rapport-h1'>Rapport de caisse</h1>
            <div className="rapportCaisse-rows">
                <div className="productSelects-container">
                    <RangePicker
                        format="YYYY-MM-DD"
                        className="product-input-select"
                        style={{ width: '100%' }}
                        onChange={handleDateChange}
                    />
                </div>
            </div>
            <RapportMoney start_date={start_date} end_date={end_date} />
            <RapportInformation start_date={start_date} end_date={end_date} />
        </div>
    );
};

RapportCaisse.propTypes = {
    start_date: PropTypes.string,
    end_date: PropTypes.string,
};

export default RapportCaisse;
