import React from 'react';
//import { Row } from 'react-bootstrap'
import { Navigation } from './Navigation'

export const Header = ( props ) => (
  <header className="page-header">
    { props.children }
    <Navigation content={ props.content } />
  </header>
);
