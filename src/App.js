import React, {Component} from 'react';
import './App.css';
import {Provider} from 'react-redux';
import CpuMeterics from './components/CpuMeterics';
import store from './store';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'

class App extends Component {

  render() {
    return (<Provider store={store}>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img alt="" src="/logo.svg" width="30" height="30" className="d-inline-block align-top"/> {' Vanguard.io'}
        </Navbar.Brand>
      </Navbar>
      <Container style={{marginTop: '1rem'}}>
        <Row>
          <Col>
            <div className="App">
              <CpuMeterics/>
            </div>
          </Col>
        </Row>
      </Container>
    </Provider>);
  }
}

export default App;
