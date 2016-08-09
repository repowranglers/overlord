import { FETCH_PROJECT } from '../actions/index';

export default function(state = [], action) {
	switch(action.type) {
		case FETCH_PROJECT:
			console.log('reducer_active_project action.payload.data ', action.payload.data)
			return [ action.payload.data, ...state ];
	}
	return state;
}