/**
 * Created by meskill on 24.02.2016.
 */

import React from 'react';
import SearchResultStore from '../stores/SearchResultStore';
import FavouritesStore from '../stores/FavouritesStore';
import Constants from '../constants/Constants';
import router from '../actions/router';

export default class Description extends React.Component {

	render() {
		let store = this.props.params.store == 'result' ? SearchResultStore.results : FavouritesStore.favourites;
		let result = store[this.props.params.index];
		return (
			<div className="description">
				<h1>{Constants.description}</h1>
				<button onClick={this.click.bind(this, result)}>+</button>
				<div id="clear"/>
				${result.price}<br/>
				{result.title.split(',').slice(0, 2).join(',')}<br/>
				<div id="img">
					<img src={result.img_url}></img><br/>
				</div>
				{result.bedroom_number} bed(s), {result.bathroom_number} bathroom(s)<br/>
				{result.summary}
			</div>
		)
	}

	click(value, e) {
		router.add_favourites(value);
	}
}