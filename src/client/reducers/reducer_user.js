import { GITHUB_LOGIN } from '../actions/login_actions';

export default function(state = {}, action) {
	switch(action.type) {
	case GITHUB_LOGIN:
		console.log('reducer_user action. action.payload ', action.payload)
		return { ...state, data: action.payload };
	default:
		return state;
	}
}
