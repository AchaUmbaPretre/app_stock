import React, { useEffect, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import axios from 'axios';
import config from './../../../config';
import Select from 'react-select';
import Swal from 'sweetalert2';
import { DatePicker } from 'antd';

const ListeCommandeSelect = ({getProduits}) => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getMarque, setGetMarque] = useState([]);
    const [datas, setDatas] = useState({});
    const [getCategorie, setGetCategorie] = useState([]);
    const [couleur, setCouleur] = useState([]);
    

    const handleStartDateChange = (e) => {
      const startDate = e.target.value;
      setDatas((prev) => ({ ...prev, start_date: startDate }));
    };
  
    const handleEndDateChange = (e) => {
      const endDate = e.target.value;
      setDatas((prev) => ({ ...prev, end_date: endDate }));
    };

      console.log(datas)

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
        const { data } = await axios.get(`${DOMAIN}/api/produit/couleur`);
        setCouleur(data);
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

/*     if (!datas.id_marque || !datas.categorie ) {
      Swal.fire({
        title: 'Error',
        text: 'Veuillez remplir tous les champs requis',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    } */
    try {
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

    </>
  )
}

export default ListeCommandeSelect