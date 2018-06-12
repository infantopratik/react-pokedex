import React, { Component } from 'react';
import { Input, Tooltip, Tag, Icon, notification } from 'antd';
import axios from 'axios';
import {observer} from 'mobx-react';

import PokemonStats from './PokemonStats';

const PokemonCard = observer(class PokemonCard extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.fetchPokemonDetails(this.props.url);
	}

	componentWillReceiveProps(nextProps) {
		this.fetchPokemonDetails(nextProps.url);
	}

	fetchPokemonDetails(url) {
		axios.get(url)
		.then(res => {
			// console.log('res', res);
			this.props.store.pokemonImage = res.data.sprites.front_default;
			this.props.store.pokemonStats = res.data.stats;
			this.props.store.pokemonTypes = res.data.types;
		})
		.catch(err => {
			console.log('err', err);
		})
	}

	addToFavorite() {
		axios.post('/api/favorite', {favoriteName: this.props.name, favoriteUrl: this.props.url})
		.then(res => {
			// console.log('res', res);
			if(res && res.status === 200) {
				this.props.store.addedAsFavorite = true;
			 	notification['success']({
			    message: `${this.props.name} added to your favorites!`
			  });
			}
		})
		.catch(err => {
			console.log('err', err);
		})
	}

	render() {
		const { pokemonTypes, pokemonImage, pokemonStats, addedAsFavorite} = this.props.store;

		const PokemonTypesTags = (pokemonTypes.length)?
		pokemonTypes.map((pokemonType, i) => <Tag color="#cda210" key={i}>{pokemonType.type.name}</Tag> )
		:
		<Tag color="#cda210">Loading...</Tag>;

		return (
			<div className="pokemonCard shadow">
				<div className="pokemonImage">
					<img className="pokemonSprite" src={pokemonImage} />
				</div>
				<div className="pokemonDetails">
					<div className="pokemonHead">
						<h2 className="pokemonName">{this.props.name.toUpperCase()}</h2>

						{(this.props.isFavoriteCard)?
							<Tooltip placement="top" title='Remove from favorites!'>
								<Icon type="heart" className="favoriteIcon" onClick={e => this.props.removeFromFavorites(this.props.name)}/>
							</Tooltip>
							:
							(addedAsFavorite)?
							<Tooltip placement="top" title='Added to favorites!'>
								<Icon type="heart" className="favoriteIcon" onClick={e => this.addToFavorite(e)}/>
							</Tooltip>
							:
							<Tooltip placement="top" title='Add to favorites!'>
								<Icon type="heart-o" className="favoriteIcon" onClick={e => this.addToFavorite(e)}/>
							</Tooltip>
						}

					</div>
					<div className="pokemonTypesDiv">{PokemonTypesTags}</div>
					{(pokemonStats.length)?<PokemonStats stats={pokemonStats}/>:<PokemonStats />}
				</div>
			</div>
		)
	}
})

export default PokemonCard;
