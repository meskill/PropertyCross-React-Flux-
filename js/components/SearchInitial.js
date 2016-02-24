/**
 * Created by meskill on 18.02.2016.
 */

import nestopia from '../actions/nestopia';
import React from 'react';
import RecentSearchStore from '../stores/RecentSearchStore';

export default class SearchInitial extends React.Component {
	constructor() {
		super();
		this.state = {
			recentSearches: RecentSearchStore.searches
		};
	}

	render() {
		return (
			<div className="recent-search">
				<h3>Recent Searches: </h3>
				<ul>
					{this.state.recentSearches.map((search) => {
						return (
							<li key={search.search}>
								<button onClick={this.recent} data={search.search}>
									{search.search} ({search.total_length})
								</button>
							</li>
						)
					})}
				</ul>
			</div>
		)
	}

	recent(e) {
		nestopia.search(e.currentTarget.getAttribute('data'));
	}
}