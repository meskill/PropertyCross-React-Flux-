/**
 * Created by meskill on 19.02.2016.
 */

import Actions from '../constants/Actions';
import router from './router';

const url = 'http://api.nestoria.co.uk/api';

const request = {
	country: 'uk',
	action: 'search_listings',
	encoding: 'json',
	listing_type: 'buy',
	page: 1,
	callback: 'jsonp_callback'
};

function parse_response(res) {
	if (!res) {
		return router.error('Unable to detect current location. Please ensure location is turned on in your phone settings and try again');
	}
	switch (res.response.application_response_code) {
		case "100":
		case "101":
		case "110":
			if (!res.response.total_results) {
				router.error('There were no properties found for the given location');
			}
			else {
				router.result({
					search: res.request.location,
					page: res.request.page,
					results: res.response.listings,
					total_length: res.response.total_results
				});
			}
			break;
		case "200":
		case "202":
			router.locations(res.response.locations);
			break;
		default:
			router.error('The location given was not recognised.');
	}
}


window.jsonp_callback = function jsonp_callback(res) {
	parse_response(res);
	let jsonp_script = document.getElementById('jsonp_callback');
	jsonp_script.parentNode.removeChild(jsonp_script);
};

function do_request() {
	let script = document.createElement('script');
	script.id = 'jsonp_callback';
	script.type = 'text/javascript';
	script.src = url + '?' + Object.keys(request).map(key => key + '=' + request[key]).join('&');
	document.getElementsByTagName('head')[0].appendChild(script);
}

export default {

	search(location) {
		request.page = 1;
		if (location) {
			request.location = location;
			delete request.centre_point;
			do_request();
		} else {
			delete request.location;
			navigator.geolocation.getCurrentPosition((position) => {
				request.centre_point = [position.coords.latitude, position.coords.longitude].join(',');
				do_request();
			});
		}
	},

	load_more() {
		request.page++;
		do_request();
	}

};