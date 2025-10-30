import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const ReportContainer = styled.div`
  text-align: center;
  padding: 20px;
  font-family: 'Lato', sans-serif;

  @media (max-width: 768px) {
    padding: 10px;
  }

  @media print {
    padding: 20px;
    width: 100%;
    font-size: 1em;
    page-break-after: always;
  }
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
  font-weight: 700;

  @media (max-width: 768px) {
    font-size: 1.5em;
    margin-bottom: 10px;
  }

  @media print {
    font-size: 2em;
    margin-bottom: 20px;
  }
`;

const Summary = styled.div`
  margin-bottom: 20px;

  @media (max-width: 768px) {
    font-size: 0.9em;
  }

  @media print {
    font-size: 1em;
    margin-bottom: 20px;
  }
`;

const TableContainer = styled.div`
  position: relative;
`;

const Table = styled.table`
  margin: auto;
  border-collapse: collapse;
  width: 90%;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid black;

  @media (max-width: 768px) {
    width: 100%;
    font-size: 0.6em;
    overflow-x: auto;
    display: block;
  }

  @media print {
    width: 100%;
    font-size: 0.8em;
  }
`;

const TableHeader = styled.th`
  padding: 4px;
  background-color: #007bff;
  color: white;
  border: 1px solid black;
  font-weight: 700;
  font-size: 0.7em;

  @media (max-width: 768px) {
    padding: 3px;
    font-size: 0.6em;
  }

  @media print {
    padding: 4px;
    font-size: 0.7em;
    background-color: #007bff;
    -webkit-print-color-adjust: exact;
  }
`;

const TableCell = styled.td`
  padding: 4px;
  border: 1px solid black;
  font-size: 0.7em;
  background-color: ${({ value }) => {
    switch (value) {
      case 'AUTOMATIC':
        return 'green';
      case 'MANUAL':
        return 'yellow';
      case 'FAILED':
        return 'red';
      case 'N/A':
        return 'purple';
      case 'IN PROGRESS':
        return '#ffb6c1';
      default:
        return 'white';
    }
  }};
  color: ${({ value }) => (value === 'MANUAL' || value === 'IN PROGRESS' ? 'black' : 'white')};

  @media (max-width: 768px) {
    padding: 3px;
    font-size: 0.6em;
  }

  @media print {
    padding: 4px;
    font-size: 0.7em;
    -webkit-print-color-adjust: exact;
  }
`;

const ServerStatusCell = styled(TableCell)`
  color: black;
`;

const RegularTableCell = styled.td`
  padding: 4px;
  border: 1px solid black;
  font-size: 0.7em;
  background-color: white;
  color: black;

  @media (max-width: 768px) {
    padding: 3px;
    font-size: 0.6em;
  }

  @media print {
    padding: 4px;
    font-size: 0.7em;
    background-color: white;
    color: black;
    -webkit-print-color-adjust: exact;
  }
`;

const PrintButton = styled.button`
  margin-bottom: 20px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;

  @media print {
    display: none;
  }
`;

const GlobalStyle = styled.div`
  @media print {
    @page {
      margin: 0;
    }
    body {
      margin: 1.6cm;
    }
  }
`;

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

function Report({ config }) {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [spaceUsed, setSpaceUsed] = useState('');

  useEffect(() => {
    axios.get(`${config.backendUrl}/data`)
      .then((response) => {
        console.log('Fetched data:', response.data);
        setStartDate(response.data.startDate);
        setEndDate(response.data.endDate);
        setSpaceUsed(response.data.spaceUsed || '');
        setData(response.data.tableData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [config.backendUrl]);

  useEffect(() => {
    console.log('Data state updated:', data);
  }, [data]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <GlobalStyle>
      <ReportContainer>
        <Title>IDRIVE WEEKLY REPORT</Title>
        <Summary>
          <h2>Report Summary</h2>
          <p><strong>Start Date:</strong> {formatDate(startDate)}</p>
          <p><strong>End Date:</strong> {formatDate(endDate)}</p>
          <p><strong>Space Used:</strong> {spaceUsed}</p>
        </Summary>
        <PrintButton onClick={handlePrint}>Print Report</PrintButton>
        <TableContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>Serial No</TableHeader>
                <TableHeader>Server Name</TableHeader>
                <TableHeader>Saturday</TableHeader>
                <TableHeader>Sunday</TableHeader>
                <TableHeader>Monday</TableHeader>
                <TableHeader>Tuesday</TableHeader>
                <TableHeader>Wednesday</TableHeader>
                <TableHeader>Thursday</TableHeader>
                <TableHeader>Friday</TableHeader>
                <TableHeader>SSL Expiry Date</TableHeader>
                <TableHeader>Server Status</TableHeader>
                <TableHeader>Remark</TableHeader>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 ? (
                <tr>
                  <RegularTableCell colSpan="12" style={{ textAlign: 'center' }}>
                    No data available
                  </RegularTableCell>
                </tr>
              ) : (
                data.map((row, index) => {
                  console.log('Rendering row:', row);
                  return (
                    <tr key={index}>
                      <RegularTableCell>{index + 1}</RegularTableCell>
                      <RegularTableCell>{row.serverName}</RegularTableCell>
                      <TableCell value={row.Saturday}>{row.Saturday}</TableCell>
                      <TableCell value={row.Sunday}>{row.Sunday}</TableCell>
                      <TableCell value={row.Monday}>{row.Monday}</TableCell>
                      <TableCell value={row.Tuesday}>{row.Tuesday}</TableCell>
                      <TableCell value={row.Wednesday}>{row.Wednesday}</TableCell>
                      <TableCell value={row.Thursday}>{row.Thursday}</TableCell>
                      <TableCell value={row.Friday}>{row.Friday}</TableCell>
                      <RegularTableCell>{formatDate(row.sslExpiryDate)}</RegularTableCell>
                      <ServerStatusCell value={row.serverStatus}>{row.serverStatus}</ServerStatusCell>
                      <RegularTableCell>{row.remark}</RegularTableCell>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
        </TableContainer>
      </ReportContainer>
    </GlobalStyle>
  );
}

export default Report;