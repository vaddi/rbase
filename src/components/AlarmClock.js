import React from 'react';
import { Audio } from './Audio';;

// Example of a simple AlarmClock in React
// Usage:
// <AlarmClock />

export class AlarmClock extends React.Component {

  constructor( props ) {
    super( props );
    this.state = { 
      date: new Date(),
      alarm: localStorage.getItem( 'alarm' ) ? localStorage.getItem( 'alarm' ) : this.props.alarm,
      alerting: false,
    };
    this._setAlarm = this._setAlarm.bind( this );
    this._setAlerting = this._setAlerting.bind( this );
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUmount() {
    clearInterval( this.timerID );
  }

  tick() {
    this.setState({
      date: new Date()
    });
    const alarm = this.convertDate( this.state.alarm, 'compare' );
    const date = this.convertDate( this.state.date, 'compare' );
    if( alarm === date ) {
      this.setState( { alerting: true } );
    }; 
  }

  _setAlarm( e ) {
    this.setState( { alarm: this.convertDate( e.target.value, 'default' ) } );
    localStorage.setItem( 'alarm', this.state.alarm );
  }

  _setAlerting( e ) {
    this.setState( { alerting: ( this.state.alerting ? false : true ) } );
  }

  _resetLocalStorage() {
    localStorage.removeItem( 'alarm' );
  }

  convertDate( date, format = undefined ) {
    // The format is "yyyy-MM-ddThh:mm" followed by optional ":ss" or ":ss.SSS".
    let now = new Date( date );
    let year = now.getFullYear();
    let months = now.getMonth() +1;
    let month = months < 10 ? '0' + months : months;
    let day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate();
    let hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    let minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    //let second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
    if( format===undefined ) {
      return year + '-' + month + '-' + day + 'T' + hour + ':' + minute;// + ':' + second;
    } else if( format==='default' ) {
      return new Date( date ); 
    } else if( format==='compare' ) {
      return Date.parse( date );
    }
  } 

  render() {
    return (
      <div>
        { this.state.alerting ? <Audio url="./Sounds/Alarm.mp3" /> : '' }
        <table>
          <tbody>
            <tr>
              <td>Time:</td>
              <td>{ this.state.date.toLocaleTimeString() }</td>
            </tr>
            <tr>
              <td><label htmlFor="alarm">Alarm: </label></td>
              <td>
                <input id="alarm" type="datetime-local" value={ this.convertDate( this.state.alarm ) } onChange={ this._setAlarm } />
              </td>
            </tr>
            <tr>
              <td>Alert: </td>
              <td>
                <input type="checkbox" checked={ this.state.alerting } onChange={ this._setAlerting } />
              </td>
            </tr>
            <tr>
              <td>Stored Alert: </td>
              <td>
                <input type="checkbox" checked={ this.state.reset } onChange={ this._resetLocalStorage } /> 
                { this.convertDate( localStorage.getItem( 'alarm' ) ) }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

AlarmClock.defaultProps = {
  alarm: new Date()
};
