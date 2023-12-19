import React from 'react'
import './rowTotal.scss'
import { CarryOutOutlined, VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import { Money } from '@mui/icons-material';
import CountUp from 'react-countup';
import { useState } from 'react';
import config from '../../config';
import { useEffect } from 'react';
import axios from 'axios';


const RowTotal = () => {
    const [venteTotal, setVenteTotal] = useState([]);
    const [produitTotalAchats, setProduitTotalAchats] = useState([]);
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/vente/venteTotal`);
            setVenteTotal(data[0]?.vente_total);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/produit/produitTotalAchats`);
            setProduitTotalAchats(data[0]?.achats_total);
            setLoading(false)
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN]);

  return (
    <>
        <div className="rowTotals">
            <div className="rowTotal-wrapper">
                <div className="rowTotal">
                    <div className="rowTotal-left">
                        <CarryOutOutlined className='rowTotalIcon' style={{color: 'orange'}}/>
                    </div>
                    <div className="rowTotal-right">
                        <h2><CountUp end={produitTotalAchats}/>$</h2>
                        <span className="rowTotal-span">Total des achats à payer</span>
                    </div>
                </div>
                <div className="rowTotal">
                    <div className="rowTotal-left" style={{background: 'rgba(0, 0, 255, 0.137)'}}>
                        <Money className='rowTotalIcon' style={{color: 'blue'}}/>
                    </div>
                    <div className="rowTotal-right">
                        <h2><CountUp end={0}/>$</h2>
                        <span className="rowTotal-span">Ventes totales dues</span>
                    </div>
                </div>
                <div className="rowTotal">
                    <div className="rowTotal-left" style={{background: 'rgba(53, 52, 52, 0.137)'}}>
                        <VerticalAlignBottomOutlined  className='rowTotalIcon' style={{color: 'rgba(53, 52, 52, 0.719)'}}/>
                    </div>
                    <div className="rowTotal-right">
                        <h2><CountUp end={venteTotal}/>$</h2>
                        <span className="rowTotal-span">Montant total de la vente</span>
                    </div>
                </div>
                <div className="rowTotal">
                    <div className="rowTotal-left" style={{background : 'rgba(0, 128, 0, 0.164)'}}>
                        <VerticalAlignTopOutlined className='rowTotalIcon' style={{color: 'green'}}/>
                    </div>
                    <div className="rowTotal-right">
                        <h2><CountUp end={venteTotal}/>$</h2>
                        <span className="rowTotal-span">Montant total de la vente</span>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default RowTotal