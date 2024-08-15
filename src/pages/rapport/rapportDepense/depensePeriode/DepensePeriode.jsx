import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { format, parseISO, isValid } from 'date-fns';

ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

const DepensePeriode = ({ data }) => {

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    return isValid(date) ? format(date, 'dd MMM yyyy') : 'Date invalide'; // Format souhaité : 07 May 2024
  };

  const labels = data ? data.map(item => formatDate(item.date)) : [];
  const values = data ? data.map(item => item.total_periode) : [];

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Total des Dépenses',
        data: values,
        fill: false,
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default DepensePeriode;
