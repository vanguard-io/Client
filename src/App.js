import React, {Component} from 'react';
import './App.css';
import {Provider} from 'react-redux';
import CpuMeterics from './components/CpuMeterics';
import store from './store';

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Navbar from 'react-bootstrap/Navbar'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      wait: 45
    };
  }

  changeWait = (e) => {
    switch (this.state.wait) {
      case 45:
        this.setState({wait: 0});
        break;
      case 30:
        this.setState({wait: 45});
        break;
      case 15:
        this.setState({wait: 30});
        break;
      case 0:
        this.setState({wait: 15});
        break;
    }
  }

  render() {
    return (<Provider store={store}>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          <img alt="" src="/logo.svg" width="30" height="30" className="d-inline-block align-top"/> {' Vanguard.io'}
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <Button bg="dark" variant="dark" type="submit" title="Wait time in seconds." onClick={this.changeWait} style={{
                fontSize: '12px',
                marginRight: '1rem'
              }}>
              {this.state.wait != 0 ? this.state.wait + ' ' : 'Auto-update off'} <i className="far fa-clock" style={{
                  display: this.state.wait != 0 ? 'inline-block' : 'none'
              }}></i>
            </Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
      <Container style={{
          marginTop: '1rem'
        }}>
        <Row>
          <Col>
            <div className="App">
              <CpuMeterics wait={this.state.wait}/>
            </div>
          </Col>
        </Row>
      </Container>
    </Provider>);
  }
}

export default App;
