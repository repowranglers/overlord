import { FETCH_PROJECTS } from '../actions/index';

export default function(state = [], action) {
	switch(action.type) {
		case FETCH_PROJECTS:
			console.log('reducer_projects action. action.payload.data ', action.payload.data)
			return [ action.payload.data, ...state ];
	}
	return state;
}