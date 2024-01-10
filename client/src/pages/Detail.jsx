import React, { useEffect, useRef } from 'react';
import { Container, Table } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { API } from '../config/api';
import Chart from 'chart.js/auto';
export default function Detail() {
  let { id } = useParams();

  let { data: gps } = useQuery('gpsDetailCache', async () => {
    const response = await API.get('/gps/' + id);
    return response.data.data;
  });

  const deviceType = gps && gps.length > 0 ? gps[0].device_type : null;

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is zero-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  };

  const chartRef = useRef();

  // Add useEffect to draw or update the pie chart
  useEffect(() => {
    if (gps) {
      // Extract labels and data from the gps array
      const locations = [...new Set(gps.map((item) => item.location))];
      const totalCount = gps.length;

      // Calculate the percentage for each location
      const data = locations.map((location) => {
        const locationCount = gps.filter(
          (item) => item.location === location
        ).length;
        return ((locationCount / totalCount) * 100).toFixed(2);
      });

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Configure the pie chart
      const ctx = document.getElementById('pieChart').getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: locations,
          datasets: [
            {
              data: data,
              backgroundColor: [
                'red',
                'blue',
                'green' // Add more colors as needed
              ]
            }
          ]
        },
        options: {
          plugins: {
            title: {
              display: true,
              text: '% Time spent on each location'
            }
          },
        }
      });
    }
  }, [gps]);
  return (
    <Container>
      <p>{id}</p>
      <p>{deviceType}</p>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {gps?.map((item, index) => (
            <tr key={index}>
              <td>{formatTimestamp(item.timestamp)}</td>
              <td>{item.location}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <canvas id="pieChart" width="400" height="400"></canvas>
    </Container>
  );
}
