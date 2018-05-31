import React, { Component } from 'react';
import { Layout, notification } from 'antd';
const { Header, Footer, Content } = Layout;
import axios from 'axios';
import './Profile.scss';

import PokemonCard from '../PokemonList/Components/PokemonCard';
import '../PokemonList/PokemonList.scss';

class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			favorites: []
		}
	}

	componentDidMount() {
		this.fetchFavorites();
	}

	fetchFavorites() {
		this.setState({favorites: []});
		axios.get('/api/favorites')
		.then(res => {
			console.log('res', res);
			if(res && res.status === 200) {
				this.setState({
					favorites: res.data
				});
			}
		})
		.catch(err => {
			console.log('err', err);
		})
	}

	removeFromFavorites(favName) {
		let self = this;
		axios.delete('/api/favorite', {data: {favoriteName: favName}})
		.then(res => {
			console.log('res', res);
			if(res && res.status === 200) {
				notification['success']({
			    message: `${favName} removed from your favorites!`,
			    description: 'Please reload the page to see the changes.'
			  });
			}
		})
		.catch(err => {
			console.log('err', err);
		})
	}

	render() {
		const FavoriteList = (this.state.favorites.length > 0)?
		this.state.favorites.map((pokemon,i)=> <PokemonCard key={i} name={pokemon.favoriteName} url={pokemon.favoriteUrl} isFavoriteCard={true} removeFromFavorites={this.removeFromFavorites}/>)
		:
		<div>Fetching your favorite pokemons...</div>

		return (
    	<div className="pokemonListContainer">
    		<h1 style={{margin: '0 auto'}}>Your Favorite(s)</h1>
    		<div className="pokemonList">
    			{FavoriteList}
    		</div>
    	</div>
		)
	}
}

export default Profile;
