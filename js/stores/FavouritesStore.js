/**
 * Created by meskill on 24.02.2016.
 */

import dispatcher from '../core/dispatcher';
import Actions from '../constants/Actions';
import EventEmiter from 'events';

class FavouritesStore extends EventEmiter {
	constructor() {
		super();

		this.favourites = [];

		this.dispatcherToken = dispatcher.register((payload) => {
			if (payload.actionType == Actions.favourites.add) {
				if (this.favourites.every((fav) => fav.guid !== payload.value.guid)) {
					this.favourites.push(payload.value);
					this.emit('change');
				}
			}
		});
	}
}

export default new FavouritesStore();