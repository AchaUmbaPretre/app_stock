import React from 'react'
import './rapportVenteChart.scss'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  import faker from 'faker';
import { useNavigate } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  export const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };


const RapportVenteChart = () => {
    const navigate = useNavigate();
  return (
    <>
        <div className="rapportVente">
            <div className="rapportVente-wrapper">
                <div className="product-container-top">
                    <div className="product-left">
                        <h2 className="product-h2">Rapport de ventes</h2>
                        <span>Voir le rapport des ventes</span>
                    </div>
                    <div className="product-right">
                        <span className="product-text">Selectionnez un mois</span>
                        <select name="" id="" className='rapport-select'>
                            <option value="">Janvier</option>
                            <option value="">Fevrier</option>
                            <option value="">Mars</option>
                        </select>
                    </div>
                </div>
                <div className="rapportVente-container">
                    <Bar options={options} data={data} />
                </div>
            </div>
        </div>

    </>
  )
}

export default RapportVenteChart