import React, { Component } from 'react'
import { Form, Label, Button, Grid, Message } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const sizes = ["small"]

const genderOptions = [
  { key: 'm', text: 'Male', value: 'male' },
  { key: 'f', text: 'Female', value: 'female' },
  { key: 'o', text: 'Other', value: 'other' },
]

class Register extends Component {
	constructor(props) {
		super(props)

		this.state = {
			name: '',
			age: null,
			gender: '',
			hometown: '',
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
					<Form.Select
            			fluid
            			label='Gender'
            			options={genderOptions}
            			placeholder='Gender'
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
					<Message>
                        Already have an account? Login <Link to='/login'>here</Link>
                     </Message>
				</Form>
				</Grid.Column>
				</Grid>
			))}
			</div>
		)
	}
}








export default Register