import React from 'react'
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

export const data = {
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
};



const RowChart = () => {
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