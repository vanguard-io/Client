import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchData} from '../actions/chartActions';
import {Line} from 'react-chartjs-2';

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

class CpuMeterics extends Component {

  interval = null;

  constructor(props) {
    super(props);

    this.state = {
      startDate: new Date(new Date(new Date().setDate(1)).setHours(0, 0, 0, 0)).toISOString().replace('Z', ''),
      endDate: new Date(new Date().setHours(23, 59, 0, 0)).toISOString().replace('Z', ''),
      valueMin: 0,
      valueMax: 100,
      updating: false,
      autoUpdate: props.wait
    };
  }

  componentWillMount() {
    this.updateChart();
    this.interval = setInterval(() => {
      this.updateChart();
    }, this.state.autoUpdate * 1000);
  }

  componentWillReceiveProps(nextProps) {
    this.props.data.data.datasets = nextProps.data.data.datasets;
    this.props.data.data.labels = nextProps.data.data.labels;
    this.props.data.options = nextProps.data.options;
    this.setState({updating: false});
    if (this.state.wait != nextProps.wait) {
      this.setState({
        autoUpdate: nextProps.wait
      }, function() {
        this.toggleAutoUpdate();
      });
    }
  }

  toggleAutoUpdate = () => {
    clearInterval(this.interval);

    if (this.state.autoUpdate != 0) {
      this.interval = setInterval(() => {
        this.updateChart();
      }, this.state.autoUpdate * 1000);
    }

  }

  updateDates = (e) => {
    this.setState({
      [e.target.name]: isNaN(parseInt(e.target.value))
        ? e.target.value
        : parseInt(e.target.value)
    }, function() {
      this.updateChart();
    });
  }

  updateChart = () => {
    this.setState({updating: true});
    this.props.fetchData(new Date(this.state.startDate).toISOString(), new Date(this.state.endDate).toISOString(), this.state.valueMin, this.state.valueMax);
  }

  render() {

    return (<div>
      <Row>
        <Col xs={12} lg={9} xl={8}>
          <Col xs={12} md={6}>
            <InputGroup size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Start Date</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl type="datetime-local" aria-label="startDate" name="startDate" onChange={this.updateDates} value={this.state.startDate}/>
            </InputGroup>
          </Col>
          <Col xs={12} md={6}>
            <InputGroup size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">End Date</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl type="datetime-local" aria-label="endDate" name="endDate" onChange={this.updateDates} value={this.state.endDate}/>
            </InputGroup>
          </Col>
        </Col>
        <Col xs={12} lg={6} xl={4}>
          <Col xs={6}>
            <InputGroup size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Min Value</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl type="number" min="0" max={(this.state.valueMax - 1)} aria-label="Min Value" name="valueMin" onChange={this.updateDates} value={this.state.valueMin}/>
            </InputGroup>
          </Col>
          <Col xs={6}>
            <InputGroup size="sm">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">Max Value</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl type="number" min={(this.state.valueMin + 1)} max="100" aria-label="Max Value" name="valueMax" onChange={this.updateDates} value={this.state.valueMax}/>
            </InputGroup>
          </Col>
        </Col>
        <Col xs={12}>
          <Col xs={1}>
            <InputGroup size="sm">
              <InputGroup.Prepend>
                <Button variant="outline-secondary" onClick={this.updateChart} style={{
                    borderTopRightRadius: '0.2rem',
                    borderBottomRightRadius: '0.2rem'
                  }}>{
                    this.state.updating
                      ? (<Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true"/>)
                      : 'Refresh'
                  }</Button>
              </InputGroup.Prepend>
            </InputGroup>
          </Col>
        </Col>
        <Col xs={12}>
          <Line data={this.props.data.data} options={this.props.data.options}/>
        </Col>
      </Row>
    </div>);
  }
}
CpuMeterics.propTypes = {
  fetchData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  ...state.meterics
});

export default connect(mapStateToProps, {fetchData})(CpuMeterics);
