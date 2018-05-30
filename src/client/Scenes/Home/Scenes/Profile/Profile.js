import React, { Component } from 'react';
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;
import axios from 'axios';
import './Profile.scss';

class Profile extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}

	render() {
		return (
    	<div>profile page</div>
		)
	}
}

export default Profile;
