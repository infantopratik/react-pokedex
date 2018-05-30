import React, { Component } from 'react';
import { Input, Tooltip } from 'antd';
import axios from 'axios';

import PokemonStats from './PokemonStats';

class PokemonCard extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			pokemonImage: '',
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

		return (
			<div className="pokemonCard shadow">
				<div className="pokemonImage">
					<img className="pokemonSprite" src={this.state.pokemonImage} />
				</div>
				<div className="pokemonDetails">
					<h2 style={{'margin-left': '20px'}}>{this.props.name.toUpperCase()}</h2>
					<PokemonStats stats={this.state.pokemonStats}/>
					{/*<div>{this.state.pokemonTypes}</div>*/}
				</div>
			</div>
		)
	}
}

export default PokemonCard;
