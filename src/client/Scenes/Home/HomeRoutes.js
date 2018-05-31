import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PokemonList from './Scenes/PokemonList/PokemonList';
import Profile from './Scenes/Profile/Profile';

const HomeRoutes = () => (
	<Switch>
		<Route path="/profile" component={Profile} />
		<Route path="/" component={PokemonList} />
	</Switch>
);

export default HomeRoutes;
