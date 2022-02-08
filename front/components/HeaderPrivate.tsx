import React from 'react'
import Link from 'next/link'

import Title from './Title'

import Router from 'next/router'
import { User } from '../models/User'
import { ProfileProvider } from '../provider/ProfileProvider'

export default class Header extends React.Component<{title: string}, {user: User}>{

	profileProvider = new ProfileProvider()

	constructor(props: any) {
		super(props)
		
		this.state = {
			user: {}
		}
	}

	componentDidMount(){
		this.getUser()
	}

	getUser = () => {
		this.profileProvider.fetchProfile().then(
			(res) => {
				this.setState({
					user: res.data
				})
			},
			err => {
				console.log(err);
			}
		)
	}

	logout = async (): Promise<void> => {
		await localStorage.removeItem('token-api')
		Router.replace('/')
	}

	render() {
		return (
			<div className="mb-15">
				<Title name={this.props.title}></Title>

				<span className='float-right'>
					<span className='mr-10'> Olá, <b>{this.state.user.name}</b></span> 	
					<span className='link' onClick={this.logout}>[Sair]</span>
				</span>

				<hr />
				
			</div>
		)
	}
	
}