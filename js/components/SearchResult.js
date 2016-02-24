/**
 * Created by meskill on 19.02.2016.
 */

import React from 'react';
import SearchResultStore from '../stores/SearchResultStore';
import nestopia from '../actions/nestopia';
import router from '../actions/router';

export default class SearchResult extends React.Component {

	constructor() {
		super();
		this.state = {results: SearchResultStore.results, total_length: SearchResultStore.total_length, loading: false};
	}

	componentWillMount() {
		this.callback = () => this.setState({
			results: SearchResultStore.results,
			total_length: SearchResultStore.total_length,
			loading: false
		});
		SearchResultStore.on('change', this.callback);
	}

	componentWillUnmount() {
		SearchResultStore.removeListener('change', this.callback)
	}

	render() {
		return (
			<div className="result">
				<table>
					<caption>
						{this.state.results.length} of {this.state.total_length}
					</caption>
					<tbody>
					{this.state.results.map(this.renderRow.bind(this))}
					</tbody>
				</table>
				{this.state.results.length < this.state.total_length ?
					(this.state.loading ?
						'Loading...' : <button onClick={this.load_more.bind(this)}>Load more...</button>)
					: null}
			</div>
		);
	}

	renderRow(result, index) {
		return (
			<tr key={index} onClick={this.click.bind(this, index)}>
				<td>
					<img src={result.img_url}></img>
				</td>
				<td>
					<div>
						<p>${result.price}</p>
						<p>{result.keywords}</p>
					</div>
				</td>
			</tr>
		);
	}

	click(index, e) {
		router.description('result', index);
	}

	load_more(e) {
		this.setState({loading: true});
		nestopia.load_more();
	}
}