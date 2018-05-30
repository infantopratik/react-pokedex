import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PokemonList from './Scenes/PokemonList/PokemonList';
import Profile from './Scenes/Profile/Profile';

const HomeRoutes = () => (
	<Switch>
		<Route exact path="/" component={PokemonList} />
		<Route path="/profile" component={Profile} />
	</Switch>
);

export default HomeRoutes;
