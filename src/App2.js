import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import 'chartjs-adapter-date-fns'; 




function App2() {
  const [casesData, setCasesData] = useState([]);

  useEffect(() => {
    axios
      .get('https://disease.sh/v3/covid-19/historical/all?lastdays=all')
      .then(response => {
        const historicalData = response.data.cases;
        const casesArray = Object.keys(historicalData).map(date => ({
          date: new Date(date),
          cases: historicalData[date],
        }));
        setCasesData(casesArray);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const chartData = {
    labels: casesData.map(item => item.date),
    datasets: [
      {
        label: 'Total Cases',
        data: casesData.map(item => item.cases),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
      },
    ],
  };
  const chartOptions = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cases',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div>
      <h2>COVID-19 Cases Over Time</h2>
      <div style={{ height: '400px' }}>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}

export default App2;
