import React from 'react';
import { Container } from 'react-bootstrap'
import { Header } from './Header';
import { Content } from './Content';
import { Footer } from './Footer';

// importing Bootstrap CSS (from pkg bootstrap)
import 'bootstrap/dist/css/bootstrap.min.css';

//
import '../styles.css';

/* Template body */
export const Template = ( props ) => (
  <Container>

    <Header content={ props.content }>
      <h1><a href="/">{ props.appName }</a> <small>{ props.appSmall }</small></h1>
      <p dangerouslySetInnerHTML={{ __html: props.appSlug }} />
    </Header>

    <Content content={ props.content }>
      { props.children }
    </Content>

    <Footer>
      <p className='float-left' dangerouslySetInnerHTML={{ __html: props.footerText }} />
    </Footer>

  </Container>
);
