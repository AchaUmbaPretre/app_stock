import React from 'react'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, LineElement, CategoryScale, LinearScale);


const DepensePeriode = ({data}) => {
    const chartData = {
        labels: data?.map(item => item.date),
        datasets: [
          {
            label: 'Total des Dépenses',
            data: data?.map(item => item.total_periode),
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            tension: 0.1,
          },
        ],
      };
      
  return (
    <div>
        <Line data={chartData} />;
    </div>
  )
}

export default DepensePeriode