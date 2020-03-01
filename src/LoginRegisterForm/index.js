import React, { Component } from 'react'
import { Form, Label, Button } from 'semantic-ui-react'

const sizes = ['large']

class LoginRegisterForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			age: null,
			hometown: '',
			email: '',
			password: ''
		}
	}

	render() {
		return(
			<div className="LoginRegisterForm">
			{sizes.map((size) => (
				<Form size={size} key={size}>
					<Form.Field>
					<Label>Name:</Label>
					<Form.Input
						inline
						type="text"
						name="name"
						placeholder="Enter Your Full Name"
						required
					/>
					</Form.Field>
					<Form.Field>
					<Label>Age:</Label>
					<Form.Input
						inline
						type="text"
						name="age"
						placeholder="Enter Your Age"
						required
					/>
					</Form.Field>
					<Form.Field>
					<Label>Hometown:</Label>
					<Form.Input
						inline
						type="text"
						name="hometown"
						placeholder="Enter Your City, State"
						required
					/>
					</Form.Field>
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
					<Button type="Submit">Register</Button>
				</Form>
			))}
			</div>
		)
	}
}








export default LoginRegisterForm