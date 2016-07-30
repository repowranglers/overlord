import { combineReducers } from 'redux';
import ProjectsReducer from './reducer_projects';
import ActiveProject from './reducer_active_project';
import ResourcesReducer from './reducer_resources';
import UserReducer from './reducer_user';

const rootReducer = combineReducers({
	projects: ProjectsReducer,
	activeProject: ActiveProject,
	resources: ResourcesReducer,
	user: UserReducer
});

export default rootReducer;