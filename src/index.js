import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

// import components example
// import { Button } from './components/Button';
import { AlarmClock } from './components/AlarmClock';

const appName = 'vaddis github page';

class App extends React.Component {
  render() {
    return (
      <div>
        <h1>{appName}</h1>
        <p>Edit me: src/index.js</p>
        <AlarmClock />
      </div>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

