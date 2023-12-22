import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import Select from 'react-select';
import moment from 'moment';
import { Image } from 'antd';
import './varianteProduit.scss'
import {FilterOutlined} from '@ant-design/icons';
import config from '../../config'

const VarianteProduit = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getProduit, setGetProduit] = useState([]);
    const [data, setData] = useState([]);
    const [getFamille,setGetFamille] = useState([]);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const id = pathname.split('/')[2];
    const [famille, setFamille] = useState();

    const handleInputChange = async (e) => {
      const fieldName = e.target.name;
      const fieldValue = e.target.value;
    
      let updatedValue = fieldValue;
    
      if (fieldName === "image") {
        // ...
      } else if (fieldName === "contact_email") {
        updatedValue = fieldValue.toLowerCase();
      } else if (Number.isNaN(Number(fieldValue))) {
        updatedValue = fieldValue.charAt(0).toUpperCase() + fieldValue.slice(1);
      } 
      setData((prev) => ({ ...prev, [fieldName]: updatedValue }));
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/varianteFiltre/${1}`);
            setGetProduit(data[0])

          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [id]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/famille`);
            setGetFamille(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/varianteProduit`);
            setData(data);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

      

      const formattedDatEntrant = moment(getProduit?.date_entree).format('DD-MM-YYYY');

  return (
    <>
        <div className="varianteProduit">
            <div className="varianteProduit-wrapper">
                <div className="varianteProduit-container-top">
                    <div className="varianteProduit-left">
                        <h2 className="varianteProduit-h2">Detail du produit</h2>
                        <span>Voir les details</span>
                    </div>
                </div>
                <div className="variant-container-bottom">
                    <div className="variant_top">
                        <div className="variant-top-left">
                          <div className="variant-top-row">
                            <FilterOutlined className='variant-icon'/>
                            <span>filtrer</span>
                          </div>
                          <Select
                            name='id_famille'
                            className='variant-select'
                            options={getFamille?.map(item => ({ value: item.id_famille, label: item.nom }))}
                            onChange={(selectedOption) => setFamille(selectedOption.value)}
                          />
                        </div>
                    </div>
                    <div className="variant_top">
                      
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default VarianteProduit