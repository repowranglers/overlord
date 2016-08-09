import { FETCH_PROJECTS } from '../actions/project_actions';

export default function(state = [], action) {
	switch(action.type) {
		case FETCH_PROJECTS:
			console.log('reducer_projects action.payload.data ', action.payload.data)
			return [ action.payload.data, ...state ];
	}
	return state;
}
