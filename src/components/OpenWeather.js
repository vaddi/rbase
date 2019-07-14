import React from 'react';

// Example which fetches data direcly from 
// Usage:
// <OpenWeather locationID="3221017" />
 
// create an Account and get an API Key: https://openweathermap.org/
// insert the API Key into .env like:
// REACT_APP_WEATHER_APIKEY=XXXXXXXXXXXXXXXX

// Complete list of Cities/Locations: http://bulk.openweathermap.org/sample/city.list.json.gz

// API URL to v2.5
let apiUrl = 'http://api.openweathermap.org/data/2.5';

export class OpenWeather extends React.Component {
  constructor( props ) {
    super( props );
    this.state = { 
      city: "",
      country: "",
      data: [],
      isLoading: true,
    }
  }

  // Default data if nothing isse// Default data if nothing issett
  static defaultProps = {
    locationID: '3221017', // Region Peine NDS
  }

  componentDidMount() {
    this.WeatherList();
  }
  
  componentWillMount() {
    //this.UserList();
  }

  WeatherList() {
    const apiKey = process.env.REACT_APP_WEATHER_APIKEY;
    const locationID = this.props.locationID;
    if( apiKey === "" || locationID === undefined ) return null;
    const userApi = apiUrl + '/forecast?id=' + locationID + '&APPID=' + apiKey;
    return fetch( userApi, {
      method: 'GET'
    }).then( response => response.json() )
    .then( ( data ) => {
      this.setState({ 
        city: data.city.name, 
        country: data.city.country, 
        data: Object.values( data.list ),
        isLoading: false,
      })
    })
  }

  timeConverter( Timestring ){
    let a = new Date( Timestring );
    let days = ['Sun','Mon','Thu','Wed','Thu','Fri','Sat'];
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return days[a.getDay()] + ' ' + a.getDate() + ' ' + months[a.getMonth()] + ' ' + a.getFullYear() + ' ' + a.getHours().toString().padStart(2, '0') + ':' + a.getMinutes().toString().padStart(2, '0') + ':' + a.getSeconds().toString().padStart(2, '0');
  }

  temperatureConverter( valNum ) {
    valNum = parseFloat( valNum );
    return Math.round( (valNum-273.15) );
  }

  windSpeed( meters ) {
    return Math.round( ( meters / 1000 ) * 3600 );
  }

  windRose( degrees ) {
    let result = "";
     switch ( true ) {
      case ( degrees < 22 ): result = "S ↓"; break;
      case ( degrees < 67 ): result = "SW ↙"; break;
      case ( degrees < 112 ): result = "W ←"; break;
      case ( degrees < 157 ): result = "NW ↖"; break;
      case ( degrees < 202 ): result = "N ↑"; break;
      case ( degrees < 247 ): result = "NO ↗"; break;
      case ( degrees < 292 ): result = "O →"; break;
      case ( degrees < 337 ): result = "SO ↘"; break;
      case ( degrees < 360 ): result = "S ↓"; break;
      default: result = "·";
    }
    return result;
    // return <div style={{ width: '8px', height: '22px', transform: 'rotate(' + Math.round( degrees ) + 'deg)' } }>↓</div>;
  }

  render() {
    // Single Data Element redering
    const list = this.state.data.map((item, i) => {
      
      const rain_last3h = item.rain === undefined || item.rain['3h'] === undefined ? '0' : item.rain['3h'];
      const wind = this.windRose( item.wind.deg );
      
      return (
        <article key={i} className="">

          <div>
            <div className="time">{ this.timeConverter( item.dt_txt ) }</div><br />
            <img className="icon" src={ "//openweathermap.org/img/wn/" + item.weather[0].icon + "@2x.png" } alt={ item.weather[0].main } title={ item.weather[0].main } />
          </div>

          <div>
            <div>{ item.weather[0].description }</div>
          </div>

          <div className="d-flex flex-items-baseline">
            <div className="mr-3 pr-3 border-right border-gray">Temperature: <br />{ this.temperatureConverter( item.main.temp ) } °C</div>
            <div className="mr-3 pr-3 border-right border-gray">Max: <br />{ this.temperatureConverter( item.main.temp_max ) } °C</div>
            <div>Min: <br />{ this.temperatureConverter( item.main.temp_min ) } °C</div>
          </div>

          <div className="d-flex flex-items-baseline border-bottom border-gray py-3">
            <div className="mr-3 pr-3 border-right border-gray">Wind: <br />{ wind } { this.windSpeed( item.wind.speed ) } km/h</div>
            <div className="mr-3 pr-3 border-right border-gray">Clouds: <br />{ item.clouds.all } %</div>
            <div className="mr-3 pr-3 border-right border-gray">Humidity: <br />{ item.main.humidity } %</div>
            <div className="mr-3 pr-3 border-right border-gray">Pressure: <br />{ item.main.pressure } hPa</div>
            <div className="mr-3 pr-3 border-right border-gray">Precipitation: <br />{ rain_last3h } l</div>
            <div className="mr-3">Freezing point depression: <br />{ item.main.temp_kf }</div>
          </div>
        
        </article>
      );
    });

    const city = this.state.city;
    const country = this.state.country;
    const city_link = 'https://openweathermap.org/city/' + this.props.locationID;
    
    // Datalist rendering
    return (
      <div>
        <h5>Open Weather Maps forecast for Region <a href={ city_link }>{ city } - { country }</a></h5>
        { this.state.isLoading ? 'Loading...' : list }
      </div>
    );
  }
}

