import React, { Component } from 'react';
import { Layout, notification } from 'antd';
const { Header, Footer, Content } = Layout;
import axios from 'axios';
import './Profile.scss';
import { observer } from 'mobx-react';

import PokemonCard from '../PokemonList/Components/PokemonCard';
import '../PokemonList/PokemonList.scss';

import PokemonCardStore from '../../../../Data/PokemonCardStore';

const Profile = observer(class Profile extends Component {

	constructor(props) {
		super(props);
		/*this.state = {
			favorites: []
		}*/
		console.log('props store favs', this.props.store.favorites);
	}

	componentDidMount() {
		this.fetchFavorites();
	}

	fetchFavorites() {
		// this.setState({favorites: []});
		this.props.store.favorites = []
		axios.get('/api/favorites')
		.then(res => {
			console.log('res', res);
			if(res && res.status === 200) {
				/*this.setState({
					favorites: res.data
				});*/
				this.props.store.favorites = res.data
				console.log('store favs after', this.props.store.favorites);
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
			self.props.store.removeFromFavorites(favName);
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
		const { favorites } = this.props.store

		const FavoriteList = (favorites.length > 0)?
		favorites.map((pokemon,i)=> <PokemonCard key={i} name={pokemon.favoriteName} url={pokemon.favoriteUrl} isFavoriteCard={true} removeFromFavorites={this.removeFromFavorites.bind(this)} store={new PokemonCardStore}/>)
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
})

export default Profile;
