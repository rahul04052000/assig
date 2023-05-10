import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

function Dashboard() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    axios.get('/api/data')
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);

    // Filter the data based on the selected year
    const filtered = data.filter((item) => item.year === year);
    setFilteredData(filtered);
  };

  const chartData = {
    labels: filteredData.map((item) => item.country),
    datasets: [
      {
        label: 'Intensity',
        data: filteredData.map((item) => item.intensity),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Likelihood',
        data: filteredData.map((item) => item.likelihood),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      // Add more datasets for other variables
    ],
  };

  return (
    <div>
      {/* Year filter */}
      <select value={selectedYear} onChange={handleYearChange}>
        <option value="">All Years</option>
        {/* Generate options dynamically based on available years */}
        {Array.from(new Set(data.map((item) => item.year))).map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>

      {/* Bar chart */}
      <Bar data={chartData} options={{ responsive: true }} />
    </div>
  );
}

export default Dashboard;
