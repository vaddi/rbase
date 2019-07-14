import React from 'react';

// Example which fetch the current Defcon state
// Usage:
// <Defcon />

// copy public/Scripts/resolver.php to a php webserver and edit the secret into it.
// insert the resolver url and the secret into .env like:
// REACT_APP_RESOLVER_URL=https://domain.tld/resolver.php
// REACT_APP_RESOLVER_SECRET=XXXXXXXXXXXXXXXX

export class Defcon extends React.Component {

  constructor( props ) {
    super( props );
    this.state = { 
      data: [],
      isLoading: true, 
    };  
  }

  componentDidMount() {
    this.updateData();
  }
  
  updateData() {
    const target = 'https://www.mi5.gov.uk/UKThreatLevel/UKThreatLevel.xml';
    const apiUrl = process.env.REACT_APP_RESOLVER_URL;
    const secret = process.env.REACT_APP_RESOLVER_SECRET;
    const format = 'json';
    const API = `${apiUrl}?secret=${secret}&target=${target}&format=${format}`;
    return fetch(API, {
      method: 'POST'
    })
      .then( response => response.json() )
      .then( ( data ) => {
        let title = data[0].channel.item.title;
        let rawLevel = title.substring( title.indexOf( ": " ) + 1 ).toLowerCase().trim();
        let level = 5;
        let color = 'blue'
        switch( rawLevel ) {
          case 'low':
            level = 5;
            color = 'blue';
            break;
          case 'moderate':
            level = 4;
            color = 'green';
            break;
          case 'substantial':
            level = 3;
            color = 'yellow';
            break;
          case 'severe':
            level = 2;
            color = 'red';
            break;
          case 'critical':
            level = 1;
            color = 'black';
            break;
          default:
            level = 5;
            color = 'blue';
        }
        let d = new Date();
        let date = d.toLocaleDateString();
        let time = d.toLocaleTimeString();
        let datetime = date + ' ' + time;
        let result = [{
          level: level,
          color: color,
          rawLevel: rawLevel,
          source: target,
          date: datetime,
        }];
        this.setState( { data: result, isLoading: false } )
    })
  }

  render() {
    const defcon = this.state.data.map( ( item, i ) => {
      return (
        <div key={ i } style={{ padding: '1px 5px 20px', margin: '0 0 20px 0', border: '3px solid ' + item.color }}>
          <h4>Current UK Threat Level: { item.rawLevel.toUpperCase() }</h4>
          Defcon: { item.level }
          <br />
          Source: { item.source }
          <br />
          Date: { item.date }
        </div>
      );
    });
    return (
      <div className="defcon">
        { this.state.isLoading ? 'Loading...' : defcon }
      </div>
    );
  }
}
