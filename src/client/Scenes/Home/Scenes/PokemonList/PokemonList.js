import React, { Component } from 'react';
import { Input, Select, Pagination } from 'antd';
const Option = Select.Option;
const Search = Input.Search;
import axios from 'axios';
import _ from 'lodash';
import { observer } from 'mobx-react'

import './PokemonList.scss';
import FilterBar from './Components/FilterBar';
import PokemonCard from './Components/PokemonCard';
import PokemonCardStore from '../../../../Data/PokemonCardStore';
import PokedexStore from '../../../../Data/PokedexStore';

const PokemonList = observer(class PokemonList extends Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const {page, pageSize} = this.props.store
		this.fetchPokemons(page, pageSize)
	}

	cachePokemons(page, pageSize) {
		this.props.store.pokemonHistory = Object.assign({[`${this.props.store.page}_${this.props.store.pageSize}`]: this.props.store.pokemonList}, this.props.store.pokemonHistory);
		this.fetchPokemons(page, pageSize);
	}

	fetchPokemons(page, pageSize) {
		this.props.store.pokemonList = [];
		if(this.props.store.pokemonHistory[`${page}_${pageSize}`]) {
			this.props.store.pokemonList = this.props.store.pokemonHistory[`${page}_${pageSize}`];
			this.props.store.page = page;
			this.props.store.pageSize = pageSize;
		} else {
			axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${(page-1)*pageSize}`)
			.then(res => {
				// console.log('res', res);
				this.props.store.pokemonList = res.data.results;
				this.props.store.totalPokemon = res.data.count;
				this.props.store.page = page;
				this.props.store.pageSize = pageSize;
			})
			.catch(err => {
				console.log('err', err)
			})
		}
	}

	updateFilter(val) {
		if(val !== 'none') {
			this.props.store.pokemonList = [];
			this.props.store.disablePagination = true;
			axios.get(`https://pokeapi.co/api/v2/type/${val}/`)
			.then(res => {
				// console.log('res', res);
				let list = [];
				_.each(res.data.pokemon, val=>{
					list.push(val.pokemon);
				});
				this.props.store.pokemonList = list;
			})
			.catch(err => {
				console.log('err', err);
			})
		} else {
			this.props.store.disablePagination = false;
			this.fetchPokemons(1, 10);
		}
	}

	render() {
		const { pokemonList, pokemonHistory, totalPokemon, disablePagination } = this.props.store;
		const PokemonCardList = (pokemonList.length)?
		pokemonList.map((pokemon,i)=>
			<PokemonCard key={i} name={pokemon.name} url={pokemon.url} isFavoriteCard={false} store={new PokemonCardStore}/>
		)
		:
		<div>Fetching the pokemons...</div>

		return (
    	<div className="pokemonListContainer">
    		<FilterBar
    			updateFilter={e => this.updateFilter(e)}
    			store={PokedexStore}
    		/>
    		<div className="pokemonList">
    			{PokemonCardList}
    		</div>
    		{(disablePagination)?
	    		null
    			:
	    		<Pagination
	    			className="paginationContainer"
	    			total={totalPokemon}
	    			onChange={(page, pageSize) => this.cachePokemons(page, pageSize)}
	    			onShowSizeChange={(page, pageSize) => this.fetchPokemons(page, pageSize)}
	    			showSizeChanger
	    			pageSizeOptions={['10','20','30','40','50']}
	  			/>
    		}
    	</div>
		)
	}
})

export default PokemonList;
