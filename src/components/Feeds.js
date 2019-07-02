import React from 'react';

// Example to fetch data from a xml source
// Usage:
// <Feeds target="https://blog.mvattersen.de/index.php?feed=rss2" />

const apiURL = '';
const secret = 'Y0UrS3cr3t!tOk3n';
const format = 'json';

export class Feeds extends React.Component {

  constructor(props) {
    super(props);
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
    const format = this.props.format;
    if( target === undefined || target === "" ) return null;
    const API = `${apiURL}?secret=${secret}&target=${target}&format=${format}`;
    return fetch(API, {
      method: 'GET',
    })
      .then(response => response.json())
      .then((data) => {
        let result = data[0].channel.item;
        this.setState({ data: result, updateAt: new Date() })
    }); 
  }

  render() {
    const feeds = this.state.data.map((item, i) => {
      return (
        <div key={i} className="feed">
          #{i} - <a href={item.link}>{item.title}</a>
          <br />
          {item.description}
        </div>
      );
    });
    return (
      <div className="feeds">
        <h3>VaddisBlog Feeds</h3>
        {feeds}
      </div>
    );
  }
}

