import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import Report from './Report';
import styled from 'styled-components';
import config from './config';

const AppContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const NavBar = styled.nav`
  margin-bottom: 20px;
  a {
    margin: 0 10px;
    text-decoration: none;
    color: #007bff;
    &:hover {
      text-decoration: underline;
    }
  }
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <NavBar>
          <Link to="/">Home</Link>
          <Link to="/report">Report</Link>
        </NavBar>
        <Routes>
          <Route exact path="/" element={<Home config={config} />} />
          <Route path="/report" element={<Report config={config} />} />
        </Routes>
      </AppContainer>
    </Router>
  );
}

export default App;