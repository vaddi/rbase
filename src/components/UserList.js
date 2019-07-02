import React from 'react';

// Example which fetches data direcly from a JSON REST API
// Fetching Data from an API and render the Data
// after the fetch promises are resolved

// API Stuff
// create a "users" mockup on https://www.mockapi.io/
let apiKey = "";
let userApi = 'https://' + apiKey + '.mockapi.io/api/v1/users';

export class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: []}
  }

  componentDidMount() {
    this.UserList();
  }
  
  componentWillMount() {
    //this.UserList();
  }

  UserList() {
    if( apiKey === "" ) return null;
    return fetch(userApi, {
      method: 'GET'
    }).then(response => response.json())
      // uncomment to enable xml-data parsing
      //.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
      .then((data) => {
        this.setState({ data: data })
      })
  }

  timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    return a.getDate() + ' ' + months[a.getMonth()] + ' ' + a.getFullYear() + ' ' + a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
  }
  
  boolConverter(value) {
    return value ? '1' : '0';
  }

  render() {
    // Single Data Element redering
    const persons = this.state.data.map((item, i) => {
      return (
        <div key={i}>
          <h1>{item.id} - {item.name}</h1>
          <div>CreatedAt: {this.timeConverter(item.createdAt)}</div>
          <div>Active: {this.boolConverter(item.active)}</div>
          <div>Image: {item.imageUrl}</div>
        </div>
      );
    });
    
    // Datalist rendering
    return (
      <div id="layout-content" className="layout-content-wrapper">
        <div className="panel-list">{ persons }</div>
      </div>
    );
  }
}

