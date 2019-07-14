import React from 'react';

// Example of playing Audio in React
// Usage:
// <Audio src="./Sounds/Boing.mp3" controls autoPlay loop preload="auto" type="audio/mpeg" />

export class Audio extends React.Component {
  render() {
    return (
      <audio { ...this.props }>
        <source src={ this.props.src } />
        { this.children }
      </audio>
    ); 
  }
}
