import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Landing from './components/landing';
import Dashboard from './containers/dashboard';
import ProjectView from './containers/project_view';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={Landing} />
		<Route path="/dashboard" component={Dashboard} />
		<Route path="/project_view/:projID" component={ProjectView} />
	</Route>
);