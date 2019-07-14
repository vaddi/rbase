import React from 'react';

// Example to fetch data from a xml source
// Usage (fetch rss from a wordpress blog):
// <Feeds target="https://blog.mvattersen.de/index.php?feed=rss2" />

const apiURL = 'https://www.mvattersen.de/resolver.php';
const secret = 'T0p5ecr3tK3y!';

export class GithubUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      updateAt: null,
      isLoading: true,
    };  
  }

  // Default data if nothing isse// Default data if nothing issett
  static defaultProps = {
    format: 'json',
  }

  componentDidMount() {
    this.getData();
  }

  timeConverter( datetime ){
    let a = new Date( datetime );
    let months = [ 'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec' ];
    return a.getDate() + ' ' + months[a.getMonth()] + ' ' + a.getFullYear() + ' ' + a.getHours() + ':' + a.getMinutes() + ':' + a.getSeconds();
  }

  getData() {
    const target = this.props.target;
    const format = this.props.format;
    //if( target === undefined || target === "" ) return null;
    const targetUrl = 'https://github.com/' + target + '.atom';
    const API = `${apiURL}?secret=${secret}&target=${targetUrl}&format=${format}`;
    // const API = `${apiURL}`;
    return fetch( API, {
      method: 'POST',
      // headers: {'Content-Type':'application/json'},
      // mode: 'no-cors',
      // body: JSON.stringify({
      //   secret: secret,
      //   target: targetUrl,
      //   format: format
      // })
    })
    .then(response => response.json())
    .then((data) => {
      let result = data[0].entry;
      this.setState({ data: result, updateAt: new Date(), isLoading: false })
    }); 
  }

  render() {
    const feeds = this.state.data.map((item, i) => {
      return (
        <article key={i}>
          <div className="time">{this.timeConverter( item.updated )}</div>
          <div>#{ i } - <a href={item.link.href}>{item.title}</a></div>
          <br />
          <div className="pt-3" dangerouslySetInnerHTML={{ __html: item.content.toString() }}></div>
        </article>
      );
    });
    return (
      <div className="feeds">
        { this.state.isLoading ? 'Loading...' : feeds }
      </div>
    );
  }
}
