/**
 * Created by meskill on 18.02.2016.
 */

import React from 'react';
import SearchPageConstants from '../constants/Constants';
import Actions from '../constants/Actions';
import nestopia from '../actions/nestopia';
import {Link} from 'react-router';

export default class SearchHeader extends React.Component {

	constructor() {
		super();
		this.state = {search: null};
	}

	render() {
		return (
			<div className="search">
				<div className="header">
					<div className="title">
						<h1>
							{SearchPageConstants.title}
						</h1>
						<Link to="/favourites">
							<button>
								Favourites
							</button>
						</Link>
					</div>

					<div>
						<p>
							{SearchPageConstants.instruction}
						</p>
						<input onChange={this.change.bind(this)}>

						</input>
						<div>
							<button onClick={this.search.bind(this)}>
								Go
							</button>
							<button onClick={this.my_location.bind(this)}>
								My location
							</button>
						</div>
					</div>
				</div>
				{this.props.children}
			</div>
		)
	}

	change(e) {
		this.setState({search: e.currentTarget.value});
	}

	search(e) {
		if (this.state.search)
			nestopia.search(this.state.search);
	}

	my_location(e) {
		nestopia.search();
	}
}