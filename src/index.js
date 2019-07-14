import React from 'react';
import ReactDOM from 'react-dom';

//
// Styling
//

// import static stylesheet file
import './styles.css';

// Use a simple Bootstrap Template
import { Template } from './components/Template';

//
// Integratet Components examples
//

// import { AlarmClock } from './components/AlarmClock'; 
// Usage:
// <AlarmClock />

// import { Audio } from './components/Audio'; 
// Usage:
// <Audio src="./Sounds/Boing.mp3" controls autoPlay loop preload="auto" type="audio/mpeg" />

// import { Button } from './components/Button';
// Cann then be used in your Code by:
// <Button />

import { Defcon } from './components/Defcon'; 
// Usage:
// <Defcon />

import { Excel } from './components/Excel'; 
// Usage:
// <Excel dataHeaders={headers} dataRows={data} />

import { Feeds } from './components/Feeds'; 
// Usage:
// <Feeds target="https://blog.mvattersen.de/index.php?feed=rss2" />

import { GithubUser } from './components/GithubUser'; 
// Usage:
// <GithubUser target="vaddi" />

import { OpenWeather } from './components/OpenWeather'; 
// Usage:
// <OpenWeather locationID="3221017" />

import { UserList } from './components/UserList'; 
// Usage:
// <UserList />

const appName = 'rbase';
const appSmall = 'react skeleton';
const appSlug = 'A small react skeleton to develop a App';
const footerText = '<p>Github <a href="https://github.com/vaddi/rbase.git">rbase</a></p>';

// Content list objects for navigation and content rendering
const content = [ 
  { id: 1, title: 'Home', url: '/', content: "Hello to the Small rbase Reace Basic Template." },
  { id: 2, title: 'Defcon', url: '/defcon.html', content: <Defcon /> },
  { id: 3, title: 'Excel', url: '/excel.html', content: <Excel /> },
  { id: 4, title: 'Feeds', url: '/feeds.html', content: <Feeds target='https://blog.mvattersen.de/index.php?feed=rss2' /> },
  { id: 5, title: 'Activity', url: '/activity.html', content: <GithubUser target='vaddi' /> },
  { id: 6, title: 'OpenWeather', url: '/openweather.html', content: <OpenWeather locationID='3221017' /> },
  { id: 7, title: 'UserList', url: '/users.html', content: <UserList /> },
];

class App extends React.Component {
  render() {
    return (
      <Template 
          appName={ appName } 
          content={ content } 
          appSmall={ appSmall } 
          appSlug={ appSlug } 
          footerText={ footerText }
      />
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

