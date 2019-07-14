import React from 'react';

/*
	Based on the Book "Durchstarten mit React"
	ISBN: 978-3-96009-042-7

  Usage:
  import { Excel } from '.components/Excel';
  ...
  const headers = ['ID','Name','AGE'];
  const data = [
    [1,"John",23],
    [2,"Jow",19],
  ];
  ...
  <Excel dataHeaders={headers} dataRows={data} />
*/

export class Excel extends React.Component {
	
	_log = [];
  
	constructor( props ) {
    super( props );
    // Initial State
    this.state = {
      data: this.props.dataRows,
      sortby: null,
      descending: false,
      edit: null,
      search: false,
			_preSearchData: null,
    };
    this._sort = this._sort.bind( this );
    this._showEditor = this._showEditor.bind( this );
    this._save = this._save.bind( this );
		this._search = this._search.bind( this );
		this._toggleSearch = this._toggleSearch.bind( this );
  }
  
  static defaultProps = {
    dataHeaders: [ 'ID', 'Name', 'Age' ],
    dataRows: [
      [ 1, "John", 23 ],
      [ 2, "Sarah", 19 ],
    ]
  }
  
	componentDidMount() {
		document.onkeydown = function( e ) {
			if( e.altKey && e.shiftKey && e.keyCode === 82 ) {
				// Alt + Shift + R(eplay)
				this._replay();
			}
		}.bind( this );
	}
	
	/*
		Editing
	*/
	
  _showEditor( e ) {
    this.setState( { edit: {
      row: parseInt( e.target.dataset.row, 10 ),
      cell: e.target.cellIndex,
    }})
  }
  
  _save( e ) {
    e.preventDefault();
    let input = e.target.firstChild;
    let data = this.state.data.slice();
    data[ this.state.edit.row ][ this.state.edit.cell ] = input.value;
    this._logSetState({
      edit: null,
      data: data,
    });
  }
	
	/*
		Sorting
	*/
	
  _sort( e ) {
    let column = e.target.cellIndex;
    let data = this.state.data.slice();
    let descending = this.state.sortby === column && !this.state.descending;
    data.sort(function(a, b) {
      return descending
        ? ( a[column] < b[column] ? 1 : -1 )
        : ( a[column] > b[column] ? 1 : -1 )
    });
    this._logSetState({
      data: data,
      sortby: column,
      descending: descending
    });
  } 
	
	/*
		Searching
	*/
	
	_toggleSearch() {
		if( this.state.search ) {
			this._logSetState({
				data: this._preSearchData,
				search: false,
			});
			this._preSearchData = null;
		} else {
			this._preSearchData = this.state.data;
			this._logSetState({
				search: true,
			});
		}
	}
	
	_search( e ) {
		let needle = e.target.value.toLowerCase();
		if( ! needle ) {
			this._logSetState( { data: this._preSearchData } );
			return;
		}
		let idx = e.target.dataset.idx;
		let searchData = this._preSearchData.filter( function( row ) {
			return row[idx].toString().toLowerCase().indexOf(needle) > -1;
		});
		this._logSetState( { data: searchData } );
	}
	
	/*
		Logging
	*/
	
	_logSetState( newState ) {
		this._log.push( JSON.parse( JSON.stringify(
			this._log.length === 0 ? this.state : newState
		)));
		this.setState( newState );
	}
	
	_replay() {
		if( this._log.length === 0 ) {
			console.warn( 'Noch kein Status zur Wiedergabe' );
			return;
		}
		let idx = -1;
		let interval = setInterval( function() {
			idx++;
			if( idx === this._log.length - 1 ) {
				clearInterval( interval );
			}
			this.setState( this._log[idx] );
		}.bind( this ), 1000);
	}
	
	/*
		Exporting
	*/
	
	_download( format, ev ) {
		let contents = format === 'json'
			? JSON.stringify( this.state.data )
			: this.state.data.reduce( function( result, row ) {
				return result
					+ row.reduce(function( rowresult, cell, idx ) {
						return rowresult
							+ '"'
							+ cell.replace(/"/g, '""')
							+ '"'
						+ ( idx < row.length -1 ? ';' : '' );
					}, '')
				+ "\n";
			}, '');
			let URL = window.URL || window.webkitURL;
			let blob = new Blob( [contents], { type: 'text/' + format } );
			ev.target.href = URL.createObjectURL( blob );
			ev.target.download = 'data.' + format;
	}
	
	/*
		Rendering
	*/
	
	_renderToolbar() {
		return <div className="toolbar">
			<button onClick={ this._toggleSearch }>Suchen</button>
			<a href='data.json' onClick={ this._download.bind( this, 'json' ) }>Export JSON</a>
			<a href='data.csv' onClick={ this._download.bind( this, 'csv' ) }>Export CSV</a>
		</div>
	}
	
	_renderSearch() {
		if( ! this.state.search ) {
			return null;
		}
		return (
			<tr onChange={ this._search }>
				{ this.props.dataHeaders.map( function( _ignore, idx ) {
					return <td key={ idx }>
						<input type="text" data-idx={ idx } />
					</td>
				})}
			</tr>
		)
	}
	
  _renderTable() {
		let state = this.state;
    return (
			<table>
			<thead onClick={ this._sort }>
			    <tr>
						{ this.props.dataHeaders.map( function( title, idx ) {
			        return (
								<th key={ idx }>{ title }{
									state.sortby === idx
										/* https://dev.w3.org/html5/html-author/charref */
										? state.descending
											? '\u2191'
											: '\u2193'
										: null
								}</th>
							)
			      }, this )}
			    </tr>
			  </thead>
				<tbody onDoubleClick={ this._showEditor }>
					{ this._renderSearch() }	
					{ state.data.map( function( row, rowidx ) {
			      return (
							<tr key={ rowidx }>
			          { row.map( function( cell, idx ) {
			            let content = cell;
			            let edit = state.edit;
			            if( edit && edit.row === rowidx && edit.cell === idx ) {
			              content = <form onSubmit={ this._save }>
											<input type="text" defaultValue={ content } />
			              </form>
			            }
			            return <td key={ idx } data-row={ rowidx }>{ content }</td>
			          }, this )}
			        </tr>
			      )
			    }, this )}
			  </tbody>
			</table>
    );
  }
	
	render() {
		return (
			<div>
				{ this._renderToolbar() }
				{ this._renderTable() }
			</div>
		)
	}
	
}
