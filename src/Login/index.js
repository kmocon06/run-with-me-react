import React, { Component } from 'react'
import { Form, Label, Button, Grid, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const sizes = ["small"]


class Login extends Component {
	constructor(props) {
		super(props)

		this.state = {
			email: '',
			password: ''
		}
	}

	handleLoginChange = (event) => {
    	this.setState({
      		[event.target.name]: event.target.value
    	})
  	}

  	handleLoginSubmit = (event) => {
    	event.preventDefault()
    	this.loginUser()
  	}

  	loginUser = () => {
  		this.props.login(this.state)
  	}

	render() {
		return(
			<div className="LoginRegister">

			{sizes.map((size) => (
				<Grid textAlign="center">
				<Grid.Column style={{maxWidth: 450}}>
				<Form onSubmit={this.handleLoginSubmit} size={sizes} key={sizes}>
					<Form.Field>
					<Label>Email:</Label>
					<Form.Input
						inline
						type="text"
						name="email"
						placeholder="Enter Your Email"
						required
						value={this.state.email}
						onChange={this.handleLoginChange}
					/>
					</Form.Field>
					<Form.Field>
					<Label>Password:</Label>
					<Form.Input
						inline
						type="password"
						name="password"
						placeholder="Enter a Password"
						required
						value={this.state.password}
						onChange={this.handleLoginChange}
					/>
					</Form.Field>
					<Button type="Submit">Login</Button>
					 <Message>
                        Don't have an account? Sign up <Link to='/register'>here</Link>
                     </Message>
				</Form>
				</Grid.Column>
				</Grid>
			))}
			</div>
		)
	}
}








export default Login