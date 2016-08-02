import { FETCH_RESOURCES } from '../actions/index';

export default function(state = [], action) {
	switch(action.type) {
		case FETCH_RESOURCES:
			console.log('reducer_resources action.payload.data ', action.payload.data)
			return [ action.payload.data, ...state ];
	}
	return state;
}