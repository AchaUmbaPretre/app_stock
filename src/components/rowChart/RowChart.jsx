import React, { useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import './rowChart.scss'
import { Bar } from 'react-chartjs-2';
import faker from 'faker';
import config from '../../config';
import axios from 'axios';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    plugins: {
      title: {
        display: true,
      },
    },
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const labels = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre','Octobre','Novembre','Decembre'];

const RowChart = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [loading, setLoading] = useState(true);
  const [venteData, setVenteData] = useState(null);
  const [datas, setDatas] = useState({start_date: 2024});
  const [achatsTotal, setAchatsTotal] = useState(null);

  const handleStartDateChange = (e) => {
    const startDate = e.target.value || new Date().getFullYear().toString();
    setDatas((prev) => ({ ...prev, start_date: startDate }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/rapport/rapportAchatsMois/total?months=${datas.start_date}`);
        const achatsData = data.map(({ mois, total_achats }) => ({
          x: monthLabels[mois - 1],
          y: total_achats,
        }));
        setAchatsTotal(achatsData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN,datas.start_date]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/rapport/rapportVenteMois/total?months=${datas.start_date}`);
        const ventesData = data.map(({ mois, total_vente }) => ({
          x: monthLabels[mois - 1],
          y: total_vente,
        }));
        setVenteData(ventesData);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [DOMAIN, datas.start_date]);

  const monthLabels = [
    'Janvier',
    'Février',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ];
  
  const data = {
    labels: monthLabels,
    datasets: [
      {
        label: 'Ventes',
        data: venteData,
        backgroundColor: 'rgba(255, 166, 0, 0.932)',
        stack: 'Stack 0',
      },
      {
        label: 'Achats',
        data: achatsTotal,
        backgroundColor: 'rgb(131, 159, 241)',
        stack: 'Stack 0',
      },
    ],
  };


  return (
    <>
        <div className="rowChart">
            <div className="rowChart-wrapper">
                <div className="rowChart-title">
                    <h3>Achats et ventes</h3>
                    <input 
                      type="number"
                      className="input-chart" 
                      onChange={handleStartDateChange}
                      min='1900'
                      max='2099'
                      step={1}
                      placeholder='YYYY'
                      value={datas.start_date}
                    />
                </div>
                <div className='rowChart-container'>
                  <Bar options={options} data={data} />
                </div>
            </div>
        </div>

    </>
  )
}

export default RowChart