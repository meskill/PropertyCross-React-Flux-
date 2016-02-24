/**
 * Created by meskill on 20.02.2016.
 */

import dispatcher from '../core/dispatcher';
import React from 'react';
import SearchResultStore from '../stores/SearchResultStore';

export default class SearchResult extends React.Component {
	constructor() {
		super();
		this.state = {
			error: error
		};
	}

	render() {
		return (
			<div className="search-error">
				<p>
					{this.state.error}
				</p>
			</div>
		)
	}
}

var error = '';
SearchResultStore.on('error', (err) => error = err);