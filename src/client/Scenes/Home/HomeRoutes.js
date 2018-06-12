import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PokemonList from './Scenes/PokemonList/PokemonList';
import Profile from './Scenes/Profile/Profile';

import store from '../../Data/PokedexStore'

const HomeRoutes = () => (
	<Switch>
		<Route path="/profile"
			render={ () => <Profile store={store} /> }
		/>
		<Route path="/"
			render={ () => <PokemonList store={store} /> }
		/>
	</Switch>
);

export default HomeRoutes;
