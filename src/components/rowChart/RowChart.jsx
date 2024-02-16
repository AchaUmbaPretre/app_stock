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

/* export const data = {
  labels,
  datasets: [
    {
      label: 'Ventes',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      backgroundColor: 'rgba(255, 166, 0, 0.932)',
      stack: 'Stack 0',
    },
    {
      label: 'Achats',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      backgroundColor: 'rgb(131, 159, 241)',
      stack: 'Stack 0',
    },
  ],
}; */

const RowChart = () => {
  const DOMAIN = config.REACT_APP_SERVER_DOMAIN;
  const [loading, setLoading] = useState(true);
  const [venteData, setVenteData] = useState(null);
  const [achatsTotal, setAchatsTotal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/rapport/rapportAchatsMois/total`);
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
  }, [DOMAIN]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${DOMAIN}/api/rapport/rapportVenteMois/total`);
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
  }, [DOMAIN]);
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
        data: venteData, // Utilisez les données de vente récupérées depuis l'API
        backgroundColor: 'rgba(255, 166, 0, 0.932)',
        stack: 'Stack 0',
      },
      {
        label: 'Achats',
        data: achatsTotal, // Utilisez les données d'achats récupérées depuis l'API
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