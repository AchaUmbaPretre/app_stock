import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const DepenseMoisChart = ({data}) => {
    const chartData = {
        labels: data.map(item => item.mois),
        datasets: [
          {
            label: 'Dépenses Mensuelles',
            data: data.map(item => item.total_mensuel),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      };

  return (
    <div>
        <Bar data={chartData} />;
    </div>
  )
}

export default DepenseMoisChart