import React from 'react';

// Example which fetches data direcly from a JSON REST API
// Fetching Data from an API and render the Data
// after the fetch promises are resolved

// create a "users" mockup on https://www.mockapi.io/ 
// insert the API Key into .env like:
// REACT_APP_MOCKUP_APIKEY=XXXXXXXXXXXXXXXX

export class UserList extends React.Component {
  constructor( props ) {
    super( props );
    this.state = { 
      data: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    this.UserList();
  }
  
  componentWillMount() {
    //this.UserList();
  }

  UserList() {
    const apiKey = process.env.REACT_APP_MOCKUP_APIKEY;
    if( apiKey === "" ) return null;
    const userApi = 'https://' + apiKey + '.mockapi.io/api/v1/users';
    return fetch( userApi, {
      method: 'GET'
    }).then( response => response.json() )
      // uncomment to enable xml-data parsing
      //.then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
      .then( ( data ) => {
        this.setState( { data: data, isLoading: false } )
      })
  }

  timeConverter( datetime ){
    let a = new Date( datetime );
    let months = [ 'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec' ];
    return a.getDate() + ' ' + months[a.getMonth()] + ' ' + a.getFullYear() + ' ' + a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
  }
  
  boolConverter( value ) {
    return value ? '1' : '0';
  }

  render() {
    // Single Data Element redering
    const persons = this.state.data.map( ( item, i ) => {
      return (
        <article key={ i }>
          <div className="media border-bottom border-gray py-3">
            <img className="mr-3" style={{ maxWidth: '64px' }} src={ item.imageUrl } alt="" />
            <div className="media-body">
              <h5 className="mt-0">{ item.id } - { item.name }</h5>
              <div>CreatedAt: { this.timeConverter( item.createdAt ) }</div>
              <div>Active: { this.boolConverter( item.active ) }</div>
            </div>
          </div>
        </article>
      );
    });
    
    // Datalist rendering
    return (
      <div className="layout-content-wrapper">
        { this.state.isLoading ? 'Loading...' : persons }
      </div>
    );
  }
}
