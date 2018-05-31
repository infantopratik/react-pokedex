import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './Scenes/Home/Home';
import Login from './Scenes/Login/Login';
import Register from './Scenes/Register/Register';

const Routes = () => (
	<Switch>
		<Route path="/login" component={Login} />
		<Route path="/register" component={Register} />
		<Route path="/" component={Home} />
	</Switch>
);

export default Routes;
