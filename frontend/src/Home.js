import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const HomeContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2em;
  margin-bottom: 20px;
  color: #333;
`;

const Header = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const DatePickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  margin-bottom: 5px;
`;

const DatePicker = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SpaceUsedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SpaceInput = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 150px;
`;

const Buttons = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Table = styled.table`
  margin: auto;
  border-collapse: collapse;
  width: 90%;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  padding: 10px;
  background-color: #007bff;
  color: white;
`;

const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

const CenteredInput = styled.input`
  text-align: center;
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const CenteredSelect = styled.select`
  text-align: center;
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

function Home({ config }) {
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [spaceUsed, setSpaceUsed] = useState('');

  useEffect(() => {
    axios.get(`${config.backendUrl}/data`)
      .then((response) => {
        setStartDate(response.data.startDate);
        setEndDate(response.data.endDate);
        setSpaceUsed(response.data.spaceUsed || '');
        setData(response.data.tableData);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [config.backendUrl]);

  const addRow = () => {
    const newRow = {
      serverName: '',
      Saturday: '',
      Sunday: '',
      Monday: '',
      Tuesday: '',
      Wednesday: '',
      Thursday: '',
      Friday: '',
      sslUpdateDate: '',
      serverStatus: '',
      remark: '',
    };
    setData([...data, newRow]);
  };

  const deleteRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleChange = (index, field, value) => {
    const newData = [...data];
    newData[index][field] = value;
    setData(newData);
  };

  const handleDayChange = (index, day, value) => {
    const newData = [...data];
    newData[index][day] = value;
    setData(newData);
  };

  const handleStatusChange = (index, value) => {
    const newData = [...data];
    newData[index]['serverStatus'] = value;
    setData(newData);
  };

  const saveAllRows = () => {
    const dataToSave = {
      startDate,
      endDate,
      spaceUsed,
      tableData: data,
    };
    axios.post(`${config.backendUrl}/data`, dataToSave)
      .then((response) => {
        console.log('Save result:', response.data);
        alert('All data saved successfully!');
      })
      .catch((error) => console.error('Error saving data:', error));
  };

  return (
    <HomeContainer>
      <Title>IDRIVE WEEKLY REPORT</Title>
      <Header>
        <DatePickerContainer>
          <Label htmlFor="start-date">Start Date:</Label>
          <DatePicker
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </DatePickerContainer>
        <DatePickerContainer>
          <Label htmlFor="end-date">End Date:</Label>
          <DatePicker
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </DatePickerContainer>
        <SpaceUsedContainer>
          <Label htmlFor="space-used">Space Used:</Label>
          <SpaceInput
            type="text"
            id="space-used"
            value={spaceUsed}
            onChange={(e) => setSpaceUsed(e.target.value)}
            placeholder="Enter space used"
          />
        </SpaceUsedContainer>
      </Header>
      <Buttons>
        <Button onClick={addRow}>Add Row</Button>
        <Button onClick={saveAllRows}>Save</Button>
      </Buttons>
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
            <TableHeader>Actions</TableHeader>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <TableCell colSpan="13" style={{ textAlign: 'center' }}>
                No data available
              </TableCell>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <CenteredInput
                    type="text"
                    value={row.serverName}
                    onChange={(e) =>
                      handleChange(index, 'serverName', e.target.value)
                    }
                  />
                </TableCell>
                {[
                  'Saturday',
                  'Sunday',
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                ].map((day) => (
                  <TableCell key={day}>
                    <CenteredSelect
                      value={row[day]}
                      onChange={(e) =>
                        handleDayChange(index, day, e.target.value)
                      }
                    >
                      <option value="">Select</option>
                      <option value="AUTOMATIC">AUTOMATIC</option>
                      <option value="MANUAL">MANUAL</option>
                      <option value="FAILED">FAILED</option>
                      <option value="IN PROGRESS">IN PROGRESS</option>
                      <option value="N/A">N/A</option>
                    </CenteredSelect>
                  </TableCell>
                ))}
                <TableCell>
                  <CenteredInput
                    type="date"
                    value={row.sslExpiryDate}
                    onChange={(e) =>
                      handleChange(index, 'sslExpiryDate', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <CenteredSelect
                    value={row.serverStatus}
                    onChange={(e) =>
                      handleStatusChange(index, e.target.value)
                    }
                  >
                    <option value="">Select Status</option>
                    <option value="ONLINE">ONLINE</option>
                    <option value="MAINTENANCE">MAINTENANCE</option>
                    <option value="OFFLINE">OFFLINE</option>
                    <option value="UNKNOWN">UNKNOWN</option>
                  </CenteredSelect>
                </TableCell>
                <TableCell>
                  <CenteredInput
                    type="text"
                    value={row.remark}
                    onChange={(e) =>
                      handleChange(index, 'remark', e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Button onClick={() => deleteRow(index)}>Delete</Button>
                </TableCell>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </HomeContainer>
  );
}

export default Home;