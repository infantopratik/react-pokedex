import React, { Component } from 'react';
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;
import axios from 'axios';
import './Home.scss';

import AppHeader from './Components/AppHeader/AppHeader';
import HomeRoutes from './HomeRoutes'

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			loading: false
		}
	}

	componentDidMount() {
		axios.get('/api/checkToken')
		.then(res=>{
			console.log('res', res);
			if(res && res.status !== 200) {
				window.location = "#/login";
			}
		})
		.catch(err => {
			console.log(err);
		})
	}

	render() {

		return (
			<Layout>
	      <AppHeader />
	      <Content className="content">
	      	<HomeRoutes />
	      </Content>
	    </Layout>
		)
	}
}

export default Home;
