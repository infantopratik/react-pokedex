import React, { Component } from 'react';
import { Input, Select } from 'antd';
const Option = Select.Option;
const Search = Input.Search;
import axios from 'axios';
import './PokemonList.scss';

class PokemonList extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}

	handleChange(value) {
	  console.log(`selected ${value}`);
	}

	render() {
		const children = []
		for (let i = 10; i < 36; i++) {
		  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
		}

		return (
    	<div className="pokemonListContainer">
    		<div className="filterBar">
    			<Search
			      placeholder="Search for Pokemon"
			      onSearch={value => console.log(value)}
			      style={{ width: '48%' }}
			    />
		    	<Select
				    mode="tags"
				    style={{ width: '48%' }}
				    placeholder="Filter By Pokemon Types"
				    onChange={e => this.handleChange(e)}
				  >
				    {children}
				  </Select>
    		</div>
    		<div className="pokemonList">
    			<div className="pokemonCard shadow">
    				<div className="pokemonImage"></div>
    				<div className="pokemonDetails">
    					<div>Pikachu</div>
    					<div>#36</div>
    					<div>45 20 75</div>
    				</div>
    			</div>
    		</div>
    	</div>
		)
	}
}

export default PokemonList;
