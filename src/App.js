import React, { Component } from 'react';
import './App.css';
import _ from 'lodash';
import { Line, Chart } from 'react-chartjs-2';

const URL = "https://api.coindesk.com/v1/bpi/historical/close.json?currency=PHP"

const numberWithCommas = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Header = props => (
  <header style={{marginBottom: 30}}>
    <div>
      <span className="header"> {props.title} </span>
    </div>

    <div className="subheader-body">
      <span className="subheader"> Written by <a className="link" href="https://markjoelchavez.com">@markisundefined</a>. </span>
      <span className="subheader"> Powered by <a className="link" href="https://www.coindesk.com/price/">CoinDesk</a>. </span>
    </div>
  </header>
)

class App extends Component {
  state = { data: null }

  constructor (props) {
    super(props)

    // chart.js defaults
    Chart.defaults.global.tooltips.callbacks = {
      label: (tooltipItem, data) => "hey"
    }
    Chart.defaults.global.defaultFontColor = '#000';
    Chart.defaults.global.defaultFontSize = 16;
  }

  componentDidMount () {
    fetch(URL)
      .then(response => response.json())
      .then(data => this.setState({data: data.bpi}))
      .catch(e => e)
  }

  formatChartData () {
    const {data} = this.state
    const lineColor = "#251f25"

    const labels = _.keys(data)
    const values = _.values(data)

    return {
      labels,
      datasets: [
        {
          label: "Bitcoin",
          fill: false,
          lineTension: 0.1,
          backgroundColor: lineColor,
          borderColor: lineColor,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: lineColor,
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          data: values
        }
      ]
    }
  }

  render() {
    if (this.state.data) {
      return (
        <div className="app">
          <Header title="BITCOIN PRICE INDEX" />

          <div style={{width: 800, margin: '0 auto'}}>
            <Line data={this.formatChartData()} height={250} />
          </div>
        </div>
      )
    }

    return null
  }
}

export default App;
