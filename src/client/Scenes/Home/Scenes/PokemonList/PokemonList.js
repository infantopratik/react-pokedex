import React, { Component } from 'react';
import { Input, Select } from 'antd';
const Option = Select.Option;
const Search = Input.Search;
import axios from 'axios';

import './PokemonList.scss';
import FilterBar from './Components/FilterBar';
import PokemonCard from './Components/PokemonCard';

class PokemonList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			pokemonList: []
		}
	}

	componentDidMount() {
		axios.get('https://pokeapi.co/api/v2/pokemon/')
		.then(res => {
			console.log('res', res);
			this.setState({pokemonList : res.data.results});
			console.log('pokemonList', this.state.pokemonList);
		})
		.catch(err => {
			console.log('err', err)
		})
	}

	handleChange(value) {
	  console.log(`selected ${value}`);
	}

	render() {
		const PokemonCardList = this.state.pokemonList.map((pokemon,i)=>
			<PokemonCard key={i} name={pokemon.name} url={pokemon.url}/>
		);
		return (
    	<div className="pokemonListContainer">
    		<FilterBar />
    		<div className="pokemonList">
    			{PokemonCardList}
    		</div>
    	</div>
		)
	}
}

export default PokemonList;
