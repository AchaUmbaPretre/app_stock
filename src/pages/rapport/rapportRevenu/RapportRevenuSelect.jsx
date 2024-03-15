import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from './../../../config';
import Swal from 'sweetalert2';

const RapportRevenuSelect = ({getProduits}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getMarque, setGetMarque] = useState([]);
    const [datas, setDatas] = useState({start_date: "2024"});
    const [getCategorie, setGetCategorie] = useState([]);
    const [couleur, setCouleur] = useState([]);
    

    const handleStartDateChange = (e) => {
      const startDate = e.target.value;
      setDatas((prev) => ({ ...prev, start_date: startDate }));
    };

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

  const handleClick = async (e) => {
    e.preventDefault();

   if (!datas.start_date) {
      Swal.fire({
        title: 'Error',
        text: 'Veuillez remplir tous les champs requis',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }
    try {
      const {data} = await axios.get(`${DOMAIN}/api/rapport/rapportRevenu/revenu?months=${datas.start_date}`);
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
                    type="number"
                    className="product-input-select"
                    name="start_date"
                    style={{ border: '1px solid #c7c7c7', cursor: 'pointer', width:"380px" }}
                    onChange={handleStartDateChange}
                    min='1900'
                    max='2099'
                    step={1}
                    placeholder='YYYY'
                    value={datas.start_date}
                />
                <div className="select-btn" onClick={handleClick}>
                    <SearchOutlined className='select-search-btn' />
                </div>
            </div>
        </div>

    </>
  )
}

export default RapportRevenuSelect