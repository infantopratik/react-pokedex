import React, { Component } from 'react';
import { Input, Select } from 'antd';
const Option = Select.Option;
const Search = Input.Search;

class FilterBar extends Component {

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
		)
	}
}

export default FilterBar;
