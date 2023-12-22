import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import moment from 'moment';
import { Image } from 'antd';
import './varianteProduit.scss'
import {FilterOutlined} from '@ant-design/icons';
import config from '../../config'

const VarianteProduit = () => {
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [getProduit, setGetProduit] = useState([]);
    const [data, setData] = useState([]);
    const [getCouleur,setGetCouleur] = useState([]);
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const id = pathname.split('/')[2];

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/produit/${id}`);
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
            const { data } = await axios.get(`${DOMAIN}/api/produit/couleur`);
            setGetCouleur(data);
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
                            <FilterOutlined className='variant'/>
                            <span>filtrer</span>
                          </div>
                          <Select
                            name='id_matiere'
                            options={getMatiere?.map(item => ({ value: item.id_matiere, label: item.nom_matiere }))}
                            onChange={selectedOption => handleInputChange({ target: { name: 'id_matiere', value: selectedOption.value } })}
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