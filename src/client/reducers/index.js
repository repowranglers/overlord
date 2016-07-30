import { combineReducers } from 'redux';
import ProjectsReducer from './reducer_projects';

const rootReducer = combineReducers({
  state: (state = {}) => state
});

export default rootReducer;