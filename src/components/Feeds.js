import React from 'react';

// Example to fetch data from a xml source
// Usage:
// <Feeds target="https://blog.mvattersen.de/index.php?feed=rss2" />

// copy public/Scripts/resolver.php to a webserver
// insert the resolver url and the secret into .env like:
// REACT_APP_RESOLVER_URL=https://domain.tld/resolver.php
// REACT_APP_RESOLVER_SECRET=XXXXXXXXXXXXXXXX

export class Feeds extends React.Component {

  constructor( props ) {
    super( props );
    this.state = {
      target: props.target,
      data: [],
      updateAt: null,
    };  
  }

  componentDidMount() {
    this.getData();
  }
  
  getData() {
    const target = this.props.target;
    if( target === undefined || target === "" ) return null;
    const apiUrl = process.env.REACT_APP_RESOLVER_URL;
    const secret = process.env.REACT_APP_RESOLVER_SECRET;
    const format = this.props.format === undefined ? 'json' : this.props.format;
    const API = `${apiUrl}?secret=${secret}&target=${target}&format=${format}`;
    return fetch(API, {
      method: 'GET',
    })
      .then( response => response.json() )
      .then( ( data ) => {
        let result = data[0].channel.item;
        this.setState( { data: result, updateAt: new Date() } )
    }); 
  }

  render() {
    const feeds = this.state.data.map( ( item, i ) => {
      return (
        <div key={ i } className="feed">
          #{i} - <a href={ item.link }>{ item.title }</a>
          <br />
          { item.description }
        </div>
      );
    });
    return (
      <div className="feeds">
        { feeds }
      </div>
    );
  }
}

