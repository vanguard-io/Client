import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchData} from '../actions/chartActions';
import {Line} from 'react-chartjs-2';

class Chart extends Component {

  componentWillMount() {
    this.props.fetchData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.props.data.data = nextProps.data;
    }
  }

  render() {
    let options = {
      scales: {
        xAxes: [
          {
            ticks: {
              autoSkip: true,
              maxTicksLimit: 22.1
            }
          }
        ]
      }
    }

    return (<div style={{width: '75%', margin: 'auto'}}><Line data={this.props.data} options={options}/></div>);
  }

}

Chart.propTypes = {
  fetchData: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
}

const mapStateToProps = state => ({data: state.data.data})

export default connect(mapStateToProps, {fetchData})(Chart);
