import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default function WeatherForecast1Day({forecast, timezone}) {
  
  function getCityDate() {
    return new Date().toLocaleString("en-US", { timeZone: timezone })
  }

  function isToday() {
    const d = getCityDate()
    const today = new Date(d)
    const date = new Date(forecast.dt_txt)
    return (today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() 
      && today.getDate() === date.getDate())
  }

  function isWhithinFuture4Days() {
    const d = getCityDate()
    const today = new Date(d)
    const date = new Date(forecast.dt_txt)
    today.setHours(0,0,0,0)
    date.setHours(0,0,0,0)
    return ((date.getTime() - today.getTime())/(1000*60*60*24) < 5)
  }

  function isAtNoon() {
    const date = new Date(forecast.dt_txt)
    return date.getHours() === 12
  }

  function getDayOfWeek() {
    const dayOfWeek = new Date(forecast.dt_txt).getDay()
    return isNaN(dayOfWeek) ? null : 
      ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][dayOfWeek]
  }

  return (
    <>
      {!isToday() && isWhithinFuture4Days() && isAtNoon() &&
      <Col className="md-3 sm-6" style={{margin: '0 3px', border: 'white', background: 'lightblue'}}>
        <Row>
           <Col style={{padding: 0}}>
            <h5 style={{margin: 0, textAlign: 'center'}}>{getDayOfWeek()}</h5>
            <Row style={{margin: 0, textAlign: 'center'}}>
            <img src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} 
                  alt={forecast.weather[0].description}/>
            </Row>   
          </Col> 
          <Col className="align-self-center col-auto" style={{padding: 0, margin: '3%'}}>
            <h6 style={{padding: 0, margin: 0}}>{forecast.main.temp.toFixed(1)} °C</h6>
            <p style={{padding: 0, margin: 0, fontSize: '65%'}}>Feels Like: {forecast.main.feels_like.toFixed()}°C</p>
          </Col>
        </Row>
      </Col>
      }
    </>
  )
}
