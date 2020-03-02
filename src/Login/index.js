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

	render() {
		return(
			<div className="LoginRegister">

			{sizes.map((size) => (
				<Grid textAlign="center">
				<Grid.Column style={{maxWidth: 450}}>
				<Form size={sizes} key={sizes}>
					<Form.Field>
					<Label>Email:</Label>
					<Form.Input
						inline
						type="text"
						name="email"
						placeholder="Enter Your Email"
						required
					/>
					</Form.Field>
					<Form.Field>
					<Label>Password:</Label>
					<Form.Input
						inline
						type="text"
						name="password"
						placeholder="Enter a Password"
						required
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