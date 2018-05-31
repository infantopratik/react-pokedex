import React, { Component } from 'react';
import { Layout, Avatar, Dropdown, Menu } from 'antd';
const { Header } = Layout;
import axios from 'axios';
import './AppHeader.scss';

class AppHeader extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}

	logout = e => {
		e.preventDefault();
    this.setState({loading: true});
    axios.post('/api/logout')
	  .then(res => {
	  	// console.log('res', res);
	  	if (res && res.status === 200) {
    		window.location = "#/login";
	  	}
	  })
	  .catch(err => {
	  	// console.log('err', err);
	  	alert('Error occurred while logging out!');
	  	window.location = "#/login";
  		this.setState({loading: false});
	  })
	}

	goToHome() {
		window.location = "#/login";
	}

	render() {

		const menu = (
		  <Menu>
		    <Menu.Item>
		      <a rel="noopener noreferrer" href="#/profile">My Profile</a>
		    </Menu.Item>
		    <Menu.Item>
		      <a rel="noopener noreferrer" onClick={this.logout} >Log Out</a>
		    </Menu.Item>
		  </Menu>
		);

		return (
	      <Header className="header" style={{ position: 'fixed', width: '100%' }}>
	      	<h3 className="logoText clickable" onClick={this.goToHome}>Pokedex</h3>
	      	<div>
	      		<Dropdown overlay={menu} placement="bottomRight">
	      			<Avatar className="ant-dropdown-link clickable" size="large" style={{ backgroundColor: '#2B2B2B' }} icon='user' />
					  </Dropdown>
	      	</div>
	      </Header>
		)
	}
}

export default AppHeader;
