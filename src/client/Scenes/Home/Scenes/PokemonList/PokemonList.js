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
			pokemonHistory: [],
			totalPokemon: 0,
			pageSize: 10,
			page: 1,
			disablePagination: false
		}
	}

	componentDidMount() {
		this.fetchPokemons(this.state.page, this.state.pageSize);
	}

	cachePokemons(page, pageSize) {
			/*pokemonHistory: this.state.pokemonHistory.concat([{
				[`${this.state.page}_${this.state.pageSize}`]: this.state.pokemonList
			}])*/
		this.setState({
			pokemonHistory: Object.assign({[`${this.state.page}_${this.state.pageSize}`]: this.state.pokemonList}, this.state.pokemonHistory)
		});
		this.fetchPokemons(page, pageSize);
	}

	fetchPokemons(page, pageSize) {
		console.log('pokeHistory', this.state.pokemonHistory);
		console.log('this.state.page', this.state.page);
		console.log('page', page);
		console.log('this.state.pageSize', this.state.pageSize);
		console.log('pageSize', pageSize);
		// console.log('page', page);
		// console.log('pageSize', pageSize);
		this.setState({
			pokemonList: []
		});
		if(this.state.pokemonHistory[`${page}_${pageSize}`]) {
			this.setState({
				pokemonList : this.state.pokemonHistory[`${page}_${pageSize}`],
				page,
				pageSize
			});
		} else {
			axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${(page-1)*pageSize}`)
			.then(res => {
				console.log('res', res);
				this.setState(
					{
						pokemonList : res.data.results,
						totalPokemon: res.data.count,
						page,
						pageSize
					}
				);
			})
			.catch(err => {
				console.log('err', err)
			})
		}
	}

	updateFilter(val) {
		console.log('type filter val', val);
		if(val !== 'none') {
			this.setState({pokemonList: [], disablePagination: true})
			axios.get(`https://pokeapi.co/api/v2/type/${val}/`)
			.then(res => {
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

		const PokemonCardList = (this.state.pokemonList.length)?
		this.state.pokemonList.map((pokemon,i)=>
			<PokemonCard key={i} name={pokemon.name} url={pokemon.url} isFavoriteCard={false}/>
		)
		:
		<div>Fetching the pokemons...</div>

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
	    			onChange={(page, pageSize) => this.cachePokemons(page, pageSize)}
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
