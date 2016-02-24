/**
 * Created by meskill on 19.02.2016.
 */

import EventEmiter from 'events';
import dispatcher from '../core/dispatcher';
import Actions from '../constants/Actions';
import config from '../config';

class SearchResultStore extends EventEmiter {

	constructor() {
		super();

		this.results = [];
		this.total_length = 0;
		this.search = '';

		this.dispatcherToken = dispatcher.register((payload) => {
			if (payload.actionType == Actions.search.result) {
				if (payload.search == this.search) {
					if (payload.page > 1)
						this.results = this.results.concat(payload.results);
				} else {
					this.results = payload.results;
					this.total_length = payload.total_length;
					this.search = payload.search;
				}
				this.emit('change');
			} else if (payload.actionType == Actions.search.error) {
				this.emit('error', payload.error);
			}
		});
	}
}

export default new SearchResultStore();