import { FETCH_STORIES } from '../actions/story_actions';

export default function (state = [], action) {
	switch(action.type) {
		case FETCH_STORIES:
		console.log('reducer_stories action.payload.data ', action.payload.data)
		return [ action.payload.data, ...state ];
	}
	return state;
}
