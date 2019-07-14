import React from 'react';

export class Content extends React.Component {
  
	constructor( props ) {
    super( props );
    // Initial State
    this.state = {
      data: this.props.content,
    };
  }

  _renderItem( item, idx ) {
    let current = window.location.pathname;
    if( item.url === current ) {
      if( typeof( item.content ) === 'object' ) {
        return ( <div key={ idx }>{ item.content }</div> );
      } else {
        return ( <div key={ idx } dangerouslySetInnerHTML={{ __html: item.content }} /> );
      }
    }
  }

  _renderContent( list ) {
    const listItems = this.props.content.map( ( item, idx ) =>
      this._renderItem( item, idx )
    );
    return listItems;
  }

	render() {
		return this._renderContent( this.props.content );
	}  
  
}

// { this.props.children }
// { this._renderContentList( this.props.content ) }

//// A pure, stateless component example
// export const Content = ( props ) => (
//   <div>
//     { props.children }
//   </div>
// );
