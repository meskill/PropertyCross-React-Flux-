/**
 * Created by meskill on 24.02.2016.
 */

import React from 'react';
import FavouritesStore from '../stores/FavouritesStore';
import Constants from '../constants/Constants';
import router from '../actions/router';
import SearchResult from './SearchResult';

export default class Favourites extends React.Component {

	constructor() {
		super();
		this.state = {favourites: FavouritesStore.favourites};
	}

	render() {
		return (
			<div className="favourites">
				<table>
					<caption>
						{Constants.favourites}
					</caption>
					<tbody>
					{this.state.favourites.map(SearchResult.prototype.renderRow.bind(this))}
					</tbody>
				</table>
			</div>
		)
	}

	click(index, e) {
		router.description('favourites', index);
	}
}