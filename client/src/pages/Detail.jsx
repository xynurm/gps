import React, { useEffect, useRef, useState } from 'react';
import { Container, Table, Row, Col } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { API } from '../config/api';
import Chart from 'react-apexcharts';

export default function Detail() {
  let { id } = useParams();

  let { data: gps, status } = useQuery('gpsDetailCache', async () => {
    const response = await API.get('/gps/' + id);

    return response.data.data;
  });

  const deviceType = gps && gps.length > 0 ? gps[0].device_type : null;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const chartRef = useRef();

  const [locations, setLocations] = useState([]);
  const [data, setData] = useState([]);

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

      // Configure the pie chart using ApexCharts
      const options = {
        labels: gpsLocations,
        dataLabels: {
          enabled: false
        },
        tooltip: {
          enabled: false
        },
        title: {
          text: '% Time spent on each location',
          align: 'center',
          margin: 10,
          offsetX: 0,
          offsetY: 0,
          floating: false,
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: 'Helvetica, Arial',
            color: '#263238'
          }
        },
        legend: {
          show: true,
          position: 'right',
          fontSize: '16px',
          fontFamily: 'Helvetica, Arial',
          fontWeight: 'bold',
          floating: false,
          formatter: function (seriesName, opts) {
            return `
            
            <Col className="align-self-center" md="3">  
            <span> ${seriesName} :</span> <br>
            <span> ${gpsData[opts.seriesIndex]} %</span>
            </Col>
            `;
          }
        }
      };

      const series = gpsData;

      // Render the ApexChart
      chartRef.current = (
        <Chart options={options} series={series} type="pie" width="400" />
      );
    }
  }, [gps]);

  if (!gps) {
    return (
      <Container>
        <Row className="mt-5">
          <h4>Data tidak ditemukan</h4>
        </Row>
      </Container>
    );
  }
  return (
    <Container>
      <Row className="mt-5 mb-4">
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
                  <td>{formatDate(item.timestamp)}</td>
                  <td>{item.location}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
        <Col>
          <div className="card">
            <div className="card-body">{chartRef.current}</div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
