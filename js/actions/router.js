/**
 * Created by meskill on 24.02.2016.
 */

import {browserHistory} from 'react-router';
import dispatcher from '../core/dispatcher';
import Actions from '../constants/Actions';

export default {
	error: (error)=> {
		dispatcher.dispatch({
			actionType: Actions.search.error,
			error: error
		});
		browserHistory.push('/error')
	},

	locations: (locations)=> {
		dispatcher.dispatch({
			actionType: Actions.search.locations,
			locations: locations
		});
		browserHistory.push('/locations')
	},

	result: (results)=> {
		dispatcher.dispatch(Object.assign({actionType: Actions.search.result}, results));
		browserHistory.push('/result')
	},

	description: (store, index) => browserHistory.push('/description/' + store + '/' + index),

	add_favourites: (value) => dispatcher.dispatch({actionType: Actions.favourites.add, value: value}),

	favourites: ()=>browserHistory.push('/favourites')
}