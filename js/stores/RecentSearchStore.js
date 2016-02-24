/**
 * Created by meskill on 18.02.2016.
 */

import EventEmiter from 'events';
import dispatcher from '../core/dispatcher';
import Actions from '../constants/Actions';
import config from '../config';

class RecentSearchStore extends EventEmiter {

	constructor() {
		super();

		this.searches = [];

		this.dispatcherToken = dispatcher.register((payload) => {
			if (payload.actionType == Actions.search.result) {
				if (!this.searches.some((search) => {
						if (search.search == payload.search) {
							search.total_length = payload.total_length;
							return true
						}
						return false;
					})) {
					this.searches.push({search: payload.search, total_length: payload.total_length});
					this.searches = this.searches.slice(-config.recentSearchesCount);
				}
			}
		});
	}
}

export default new RecentSearchStore();