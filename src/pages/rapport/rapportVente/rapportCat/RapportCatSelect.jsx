import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from './../../../../config';
import Swal from 'sweetalert2';

const RapportCatSelect = ({ getProduits }) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [datas, setDatas] = useState({ start_date: '', end_date: '' });

    const fetchProduits = async (startDate, endDate) => {
        try {
            const { data } = await axios.get(`${DOMAIN}/api/rapport/rapport/venteCat?start_date=${startDate}&end_date=${endDate}`);
            getProduits(data);
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    const handleStartDateChange = (e) => {
        const startDate = e.target.value;
        setDatas((prev) => {
            const updatedDatas = { ...prev, start_date: startDate };
            fetchProduits(updatedDatas.start_date, updatedDatas.end_date);
            return updatedDatas;
        });
    };

    const handleEndDateChange = (e) => {
        const endDate = e.target.value;
        setDatas((prev) => {
            const updatedDatas = { ...prev, end_date: endDate };
            fetchProduits(updatedDatas.start_date, updatedDatas.end_date);
            return updatedDatas;
        });
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
                    au
                    <input
                        type="date"
                        className="product-input-select"
                        name="end_date"
                        style={{ border: '1px solid #c7c7c7', cursor: 'pointer' }}
                        onChange={handleEndDateChange}
                    />
                </div>
            </div>
        </>
    );
};

export default RapportCatSelect;
