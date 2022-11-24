import React, { Component} from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Clock from 'react-live-clock'

export default class CurrentWeather extends Component {

  getDayOfWeek = () => {
    const d = this.getCityDate()
    const dayOfWeek = new Date(d).getDay()
    return isNaN(dayOfWeek) ? null : 
      ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek]
  }

  getMonth = () => {
    const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const d = this.getCityDate()
    const dateMonth = new Date(d).getMonth()
    return month[dateMonth]
  }

  getDate = () => {
    const d = this.getCityDate()
    return new Date(d).getDate()
  }

  getYear = () => {
    const d = this.getCityDate()
    return new Date(d).getFullYear()
  }

  getCityDate = () => {
    return new Date().toLocaleString("en-US", { timeZone: this.props.timezone })
  }
 
  render() {
    return (
      <>
        <Col className="col-auto" style={{padding: '1%'}}>
          <h2 style={{margin: '5px 0px 12px'}}>{this.props.city}, {this.props.country}</h2>
          <h4>{this.getDayOfWeek()}</h4>
          <h6>{this.getMonth()} {this.getDate()}, {this.getYear()}</h6>
          <h5><Clock format={'HH:mm:ss A'} ticking={true} timezone={this.props.timezone} ></Clock></h5>
        </Col>
        <Col className="col" style={{padding:'1%'}}>
          <Row>
            <Col>
              <img src={`http://openweathermap.org/img/wn/${this.props.today.weather[0].icon}@2x.png`} 
                  alt={this.props.today.weather[0].main} className="img-fluid w-100" style={{margin: 0}}/>
              <p style={{fontSize: "80%", textAlign: "center"}}>
                {(this.props.today.weather[0].description).toUpperCase()}</p>
            </Col>
            <Col className="align-self-center">
              <h1>{this.props.today.main.temp.toFixed(1)} °C</h1>
              <h6>Feels Like: {this.props.today.main.feels_like.toFixed(0)} °C</h6>
            </Col>
          </Row>
        </Col>
        <Col className="col-auto" style={{padding: '1%', textAlign: "right"}}>
          <h6 style={{margin: '20px 0px 12px'}}>Humidity: {this.props.today.main.humidity}%</h6>
          <h6 style={{margin: '12px 0px'}}>Wind: {this.props.today.wind.speed.toFixed(1)} m/s</h6>
          <h6 style={{margin: '12px 0px'}}>High: {this.props.today.main.temp_max.toFixed(1)} °C</h6>
          <h6 style={{margin: '12px 0px'}}>Low: {this.props.today.main.temp_min.toFixed(1)} °C</h6>
        </Col>
      </>
    )
  }
}
