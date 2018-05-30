import React, { Component } from 'react';
import { Input, Tooltip, Tag } from 'antd';
import axios from 'axios';

import PokemonStats from './PokemonStats';

class PokemonCard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			pokemonImage: null,
			pokemonStats: [],
			pokemonTypes: []
		}
	}

	componentDidMount() {
		axios.get(this.props.url)
		.then(res => {
			console.log('res', res);
			this.setState({
				pokemonImage: res.data.sprites.front_default,
				pokemonStats: res.data.stats,
				pokemonTypes: res.data.types,
			});
		})
		.catch(err => {
			console.log('err', err);
		})
	}

	render() {

		const PokemonTypesTags = (this.state.pokemonTypes.length)?
		this.state.pokemonTypes.map((pokemonType, i) => <Tag color="#cda210" key={i}>{pokemonType.type.name}</Tag> )
		:
		<Tag color="#cda210">Loading...</Tag>;

		return (
			<div className="pokemonCard shadow">
				<div className="pokemonImage">
					<img className="pokemonSprite" src={this.state.pokemonImage} />
				</div>
				<div className="pokemonDetails">
					<h2 className="pokemonName">{this.props.name.toUpperCase()}</h2>
					<div className="pokemonTypesDiv">{PokemonTypesTags}</div>
					{(this.state.pokemonStats.length)?<PokemonStats stats={this.state.pokemonStats}/>:<PokemonStats />}
				</div>
			</div>
		)
	}
}

export default PokemonCard;
