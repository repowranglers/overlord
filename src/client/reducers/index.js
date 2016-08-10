import { combineReducers } from 'redux';
import ProjectsReducer from './reducer_projects';
import ActiveProject from './reducer_active_project';
import ResourcesReducer from './reducer_resources';
import UserReducer from './reducer_user';
import UserStories from './reducer_stories';

const rootReducer = combineReducers({
	projects: ProjectsReducer,
	activeProject: ActiveProject,
	resources: ResourcesReducer,
	user: UserReducer,
	stories: UserStories
});

export default rootReducer;