import React from 'react';
import PropTypes from 'prop-types';

// Example of a simple HTML Button in React
// Usage:
// <Button />

export class Button extends React.Component {
  render() {
    return (
      <button>
        {this.props.title}
      </button>
    );
  }
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
};

