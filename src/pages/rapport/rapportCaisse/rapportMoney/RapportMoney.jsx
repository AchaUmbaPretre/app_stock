import React from 'react'
import { VerticalAlignBottomOutlined, VerticalAlignTopOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import config from '../../../../config';


const RapportMoney = ({start_date, end_date}) => {
    const [venteTotal, setVenteTotal] = useState([]);
    const [produitTotalAchats, setProduitTotalAchats] = useState([]);
    const [depenses, setDepenses] = useState([]);
    const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
    const user = useSelector((state) => state.user?.currentUser);
    const [open, setOpen] = useState(false);

    const showModal = () => {
      setOpen(true);
    };

    useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/rapport/venteTotal/total?start_date=${start_date}&end_date=${end_date}`);
            setVenteTotal(data[0]?.montant_total_vente);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,start_date,end_date]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const { data } = await axios.get(`${DOMAIN}/api/depenses/caisseDepenseCount?date_start=${start_date}&date_end=${end_date}`);
            setDepenses(data[0]?.total_depense);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [DOMAIN,start_date,end_date]);

  return (
    <>
        <div className="rowTotals">
            <div className="rowTotal-wrapper">
{/*                 <div className="rowTotal">
                    <div className="rowTotal-left">
                        <CarryOutOutlined className='rowTotalIcon' style={{color: 'orange'}}/>
                    </div>
                    <div className="rowTotal-right">
                        <h2><CountUp end={produitTotalAchats}/>$</h2>
                        <span className="rowTotal-span">Total des achats à payer</span>
                    </div>
                </div> */}
{/*                 <div className="rowTotal">
                    <div className="rowTotal-left" style={{background: 'rgba(0, 0, 255, 0.137)'}}>
                        <Money className='rowTotalIcon' style={{color: 'blue'}}/>
                    </div>
                    <div className="rowTotal-right">
                        <h2><CountUp end={produitTotalDuel}/>$</h2>
                        <span className="rowTotal-span">Ventes totales dues</span>
                    </div>
                </div> */}
                { user?.role === 'admin' &&
                  <div className="rowTotal">
                    <div className="rowTotal-left" style={{background: 'rgba(53, 52, 52, 0.137)'}}>
                        <VerticalAlignBottomOutlined  className='rowTotalIcon' style={{color: 'rgba(53, 52, 52, 0.719)'}}/>
                    </div>
                    <div className="rowTotal-right">
                        <h2><CountUp end={venteTotal}/>$</h2>
                        <span className="rowTotal-span">Montant total de la vente</span>
                    </div>
                  </div>
                }
                <div className="rowTotal">
                    <div className="rowTotal-left" style={{background : 'rgba(255, 0, 0, 0.164)'}}>
                        <VerticalAlignTopOutlined className='rowTotalIcon' style={{color: 'red'}}/>
                    </div>
                    <div className="rowTotal-right">
                        <h2><CountUp end={depenses}/>$</h2>
                        <span className="rowTotal-span">Montant total des dépenses</span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default RapportMoney