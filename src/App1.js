import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';


function App1() {
  const [data, setData] = useState([]);
  const [country, setCountry] = useState('');
  const [cases, setCases] = useState(0);
  const [deaths, setDeaths] = useState(0);
  const [recovered, setRecovered] = useState(0);

  useEffect(() => {
    axios.get('https://disease.sh/v3/covid-19/countries')
      .then(response => {
        const countriesData = response.data;
        setData(countriesData);
        const initialCountry = countriesData.find(countryData => countryData.country === 'USA');
        if (initialCountry) {
          setCountry(initialCountry.country);
          setCases(initialCountry.cases);
          setDeaths(initialCountry.deaths);
          setRecovered(initialCountry.recovered);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 
  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    const selectedCountryData = data.find(countryData => countryData.country === selectedCountry);
    if (selectedCountryData) {
      setCountry(selectedCountryData.country);
      setCases(selectedCountryData.cases);
      setDeaths(selectedCountryData.deaths);
      setRecovered(selectedCountryData.recovered);
    }
  };
  const chartData = {
    labels: ['Cases', 'Deaths', 'Recovered'],
    datasets: [
      {
        label: 'COVID-19 Data',
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        borderWidth: 1,
        hoverBackgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)'],
        hoverBorderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
        data: [cases, deaths, recovered],
      },
    ],
  };
  return (
    <div className="App">
      <h1>COVID-19 Dashboard</h1>
      <select onChange={handleCountryChange}>
        {data.map(countryData => (
          <option key={countryData.country} value={countryData.country}>
            {countryData.country}
          </option>
        ))}
      </select>
      <div style={{ height: '650px' }}>
        <Bar
          data={chartData}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                beginAtZero: true,
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
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              },
            },
            responsive: true,
          }}
        />
      </div>
    </div>
  );
}

export default App1;
