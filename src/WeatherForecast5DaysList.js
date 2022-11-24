import axios from 'axios'
import React, { Component } from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import CurrentWeather from './CurrentWeather'
import WeatherForecast1Day from './WeatherForecast1Day'
import cloud from './cloud.png'

export default class WeatherForecast5DaysList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            forecasts: [],
            currWeather: '',
            city: 'Toronto',
            country: '',
            lat: 43.7001,
            lon: -79.4163,
            timezone: ''
        }
    }
    
    // get current weather
    getCurrentWeather = () => {
        const currWeather_URL = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.city}&appid=4bd5f2851709651df9c5e59f308d2af6&units=metric`
        axios.get(currWeather_URL)
        .then(res =>  { 
            console.log(res.data)
            this.setState({currWeather: res.data, city: res.data.name, 
                lat: res.data.coord.lat, lon: res.data.coord.lon})
        }).catch(error => {
            console.log(error)
        })
    }

    // get 5 days forcast including today's
    get5DaysWeatherForcast = () => {
        const Forecast_URL = `http://api.openweathermap.org/data/2.5/forecast?q=${this.state.city}&appid=4bd5f2851709651df9c5e59f308d2af6&units=metric`
        axios.get(Forecast_URL)
            .then(res => {
                console.log(res.data)
                this.setState({forecasts: res.data.list, country: res.data.city.country})
            }).catch(error => {
                console.log(error)
            })
    }

    // get city timezone
    getTimeZoneStr = () => {
        const location_URL = `https://api.timezonedb.com/v2.1/get-time-zone?key=JS6RXYNKQQR9&format=json&by=position&lat=${this.state.lat}&lng=${this.state.lon}`
        axios.get(location_URL)
        .then(res => {
            console.log(res.data)
            this.setState({timezone: res.data.zoneName})
        }).catch(error => {
            console.log(error)
        })
      }

    componentDidMount = () => {
        this.getCurrentWeather()
        this.get5DaysWeatherForcast()
        this.getTimeZoneStr()//
    }

    onValueChange = (event) => {
        this.setState({[event.target.name] : event.target.value})
    }

    onSubmitForm = (event) => {
        event.preventdefault()
        this.componentDidMount()
    }
    
  render() {
    return (
        <>
        <div style={{backgroundImage: `url(${cloud})`, backgroundSize: 'cover', width: 'auto'}}>
            <Container style={{width: 600, background: 'pink'}}>
                <Nav className="navbar navbar-expand-lg" style={{textAlign: 'right'}}>
                    <Form className="d-flex">
                        <input type="hidden" name="lat" onChange={(e)=> this.onValueChange(e)}/>
                        <input type="hidden" name="lon" onChange={(e)=> this.onValueChange(e)}/>
                        <Form.Control type="search" placeholder="Search City" name="city" 
                            onChange={(e)=> this.onValueChange(e)} className="me-2" aria-label="Search" style={{width: '80%'}}/>
                        <Button onClick={(e)=> this.onSubmitForm(e)}>
                            <img src='icon-search.png' alt='search'/>
                        </Button>
                    </Form>
                </Nav>
                <Row>
                    <CurrentWeather today={this.state.currWeather} city={this.state.city} timezone={this.state.timezone}
                    country={this.state.country} lat={this.state.lat} lon={this.state.lon}/>
                </Row>
                <Row style={{padding: 2}}>
                    {
                        this.state.forecasts.map(f => (
                            <>
                                <WeatherForecast1Day forecast={f} timezone={this.state.timezone}/>
                            </>
                        ))
                    }
                </Row>
            </Container>
        </div>
        </>
    )
  }
}
