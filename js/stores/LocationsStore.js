/**
 * Created by meskill on 19.02.2016.
 */

import EventEmiter from 'events';
import dispatcher from '../core/dispatcher';
import Actions from '../constants/Actions';
import config from '../config';

class LocationStore extends EventEmiter {

	constructor() {
		super();

		this.locations = [];

		this.dispatcherToken = dispatcher.register((payload) => {
			if (payload.actionType == Actions.search.locations) {
				this.locations = payload.locations;
				this.emit('change');
			}
		});
	}
}

export default new LocationStore();