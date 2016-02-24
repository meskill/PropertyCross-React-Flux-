/**
 * Created by meskill on 22.02.2016.
 */

import Actions from '../constants/Actions';
import nestopia from '../actions/nestopia';
import React from 'react';
import LocationStore from '../stores/LocationsStore';

export default class SearchLocation extends React.Component {
	constructor() {
		super();
		this.state = {
			locations: LocationStore.locations
		};
		this.callback = () => this.setState({locations: LocationStore.locations})
	}

	componentWillMount() {
		LocationStore.on('change', this.callback);
	}

	componentWillUnmount() {
		LocationStore.removeListener('change', this.callback);
	}

	render() {
		return (
			<div className="search-locations">
				<h3>Please select a location below: </h3>
				<ul>
					{this.state.locations.map((location, index) => {
						return (
							<li key={index}>
								<button onClick={this.search.bind(this)}>
									{location.title}
								</button>
							</li>
						)
					})}
				</ul>
			</div>
		)
	}

	search(e) {
		nestopia.search(e.currentTarget.innerText);
	}
}