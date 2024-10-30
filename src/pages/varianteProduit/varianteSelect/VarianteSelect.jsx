import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from './../../../config';
import Select from 'react-select';
import Swal from 'sweetalert2';

const VarianteSelect = ({ getProduits }) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [datas, setDatas] = useState({});
    const [getCategorie, setGetCategorie] = useState([]);
    const [getMarque, setGetMarque] = useState([]);

    const handleInputChange = (e) => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        let updatedValue = fieldValue;

        if (fieldName === "contact_email") {
            updatedValue = fieldValue.toLowerCase();
        } else if (Number.isNaN(Number(fieldValue))) {
            updatedValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
        }

        setDatas((prev) => ({ ...prev, [fieldName]: updatedValue }));
    };

    const handleStartDateChange = (e) => {
        const startDate = e.target.value;
        setDatas((prev) => ({ ...prev, start_date: startDate }));
    };

    const handleEndDateChange = (e) => {
        const endDate = e.target.value;
        setDatas((prev) => ({ ...prev, end_date: endDate }));
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${DOMAIN}/api/produit/categorie`);
                setGetCategorie(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [DOMAIN]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${DOMAIN}/api/produit/marque`);
                setGetMarque(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [DOMAIN]);

    const handleClick = async () => {
        try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/listeVarianteProduit?id_cat=${datas.categorie}&id_marque=${datas.id_marque}&start_date=${datas.start_date}&end_date=${datas.end_date}`);
            getProduits(data?.data);
        } catch (err) {
            Swal.fire({
                title: 'Error',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'OK',
            });
            console.log(err);
        }
    };

    // Utiliser useEffect pour déclencher handleClick lorsque id_marque change
    useEffect(() => {
        if (datas.id_marque) {
            handleClick();
        }
    }, [datas.id_marque, datas.id_categorie]);

    return (
        <>
            <div className="productSelects">
                <div className="productSelects-container">
                    <Select
                        className="product-input-select"
                        name='id_marque'
                        options={getMarque?.map(item => ({ value: item.id_marque, label: item.nom }))}
                        onChange={selectedOption => handleInputChange({ target: { name: 'id_marque', value: selectedOption.value } })}
                        placeholder="Choisir une marque"
                    />
                    <Select
                        className="product-input-select"
                        name='categorie'
                        options={getCategorie?.map(item => ({ value: item.id_categorie, label: item.nom_categorie }))}
                        onChange={selectedOption => handleInputChange({ target: { name: 'categorie', value: selectedOption.value } })}
                        placeholder="Choisir une categorie"
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
                        placeholder='Entrer la date end'
                    />
                    <div className="select-btn" onClick={handleClick}>
                        <SearchOutlined className='select-search-btn' />
                    </div>
                </div>
            </div>
        </>
    );
};

export default VarianteSelect;
