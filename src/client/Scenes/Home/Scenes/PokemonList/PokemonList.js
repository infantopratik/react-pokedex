import React, { Component } from 'react';
import { Input, Select, Pagination } from 'antd';
const Option = Select.Option;
const Search = Input.Search;
import axios from 'axios';
import _ from 'lodash';

import './PokemonList.scss';
import FilterBar from './Components/FilterBar';
import PokemonCard from './Components/PokemonCard';

class PokemonList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			pokemonList: [],
			totalPokemon: 0,
			pageSize: 10,
			page: 1,
			disablePagination: false
		}
	}

	componentDidMount() {
		this.fetchPokemons(this.state.page, this.state.pageSize);
	}

	fetchPokemons(page, pageSize) {
		this.setState({pokemonList: []});
		console.log('page', page);
		console.log('pageSize', pageSize);
		axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${(page-1)*pageSize}`)
		.then(res => {
			console.log('res', res);
			this.setState({pokemonList : res.data.results, totalPokemon: res.data.count});
		})
		.catch(err => {
			console.log('err', err)
		})
	}

	updateFilter(val) {
		console.log('type filter val', val);
		if(val !== 'none') {
			axios.get(`https://pokeapi.co/api/v2/type/${val}/`)
			.then(res => {
				this.setState({pokemonList: [], disablePagination: true})
				console.log('res', res);
				let list = [];
				_.each(res.data.pokemon, val=>{
					list.push(val.pokemon);
				});
				this.setState({
					pokemonList: list
				});
			})
			.catch(err => {
				console.log('err', err);
			})
		} else {
			this.setState({
				disablePagination: false
			});
			this.fetchPokemons(1, 10);
		}
	}

	render() {
		const PokemonCardList = this.state.pokemonList.map((pokemon,i)=>
			<PokemonCard key={i} name={pokemon.name} url={pokemon.url}/>
		);
		return (
    	<div className="pokemonListContainer">
    		<FilterBar
    			typeFilter={'none'}
    			updateFilter={e => this.updateFilter(e)}
    		/>
    		<div className="pokemonList">
    			{PokemonCardList}
    		</div>
    		{(this.state.disablePagination)?
	    		null
    			:
	    		<Pagination
	    			className="paginationContainer"
	    			total={this.state.totalPokemon}
	    			onChange={(page, pageSize) => this.fetchPokemons(page, pageSize)}
	    			onShowSizeChange={(page, pageSize) => this.fetchPokemons(page, pageSize)}
	    			showSizeChanger
	    			pageSizeOptions={['10','20','30','40','50']}
	  			/>
    		}
    	</div>
		)
	}
}

export default PokemonList;
