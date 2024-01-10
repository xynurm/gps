import React, { useEffect, useRef, useState } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
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

  const [locations, setLocations] = useState([]);
  const [data, setData] = useState([]);

  // Add useEffect to draw or update the pie chart
  useEffect(() => {
    if (gps) {
      // Extract labels and data from the gps array
      const gpsLocations = [...new Set(gps.map((item) => item.location))];
      const totalCount = gps.length;

      // Calculate the percentage for each location
      const gpsData = gpsLocations.map((location) => {
        const locationCount = gps.filter(
          (item) => item.location === location
        ).length;
        return (locationCount / totalCount) * 100;
      });

      setLocations(gpsLocations);
      setData(gpsData);

      if (chartRef.current) {
        chartRef.current.destroy();
      }

      // Configure the pie chart
      const ctx = document.getElementById('pieChart').getContext('2d');
      chartRef.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: gpsLocations,
          datasets: [
            {
              data: gpsData
            }
          ]
        }
      });
    }
  }, [gps]);
  return (
    <Container>
      <Row className='mt-5'>
        <h4>{id}</h4>
        <h4>{deviceType}</h4>
      </Row>

      <Row>
        <Col md="4">
          <Table bordered>
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
        </Col>
        <Col>
          <div className="card">
            <div className="card-body">
              <div className="row d-flex justify-content-center">
                <Col md="6">
                  <canvas id="pieChart" width="100" height="100"></canvas>
                </Col>
                <Col className="align-self-center" md="3">
                  Time Spent
                  {locations.map((location, index) => (
                    <li key={index}>
                      {location}: <br /> {data[index]}%
                    </li>
                  ))}
                </Col>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
