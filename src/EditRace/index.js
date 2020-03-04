import React, { Component } from 'react'
import { Button, Form, Header, Modal } from 'semantic-ui-react'


class EditRace extends Component {

	constructor(props) {
		super(props)

		this.state = {
    		name: '',
    		distance: '',
    		location: '',
    		date: ''
    	}
  	}

  	componentDidMount() {
		this.setState({
			name: this.props.raceToEdit.name,
			distance: this.props.raceToEdit.distance,
			location: this.props.raceToEdit.location,
			date: this.props.raceToEdit.date
		})
	}

  	handleEditFormChange = (event) => {
    	this.setState({
      		[event.target.name]: event.target.value
    	})
  	}

  	handleEditFormSubmit = (event) => {
    	event.preventDefault()

  	}


  	render() {

  		console.log(this.state);

	    return(
	    	<div>
	    	<Modal open={this.props.newRaceFormOpen} closeIcon={true} onClose={this.props.closeNewRaceForm}>
	    		<Modal.Content>
	    			<Header>
	    				<h4>Edit this race:</h4>
	        		</Header>
	    				<Form onSubmit={this.handleEditFormSubmit}>
	        				<p>Name:</p>
			        		<Form.Input 
			            		type="text"
			            		name="name"
			            		value={this.state.name}
			            		onChange={this.handleEditFormChange}
			          		/>
			          		<p>Distance:</p>
			          		<Form.Input
			            		type="text"
			            		name="distance"
			            		value={this.state.distance}
			            		onChange={this.handleEditFormChange}
			          		/>         
			          		<p>Location:</p>
			          		<Form.Input 
			            		type="text"
			            		name="location"
			            		value={this.state.location}
			            		onChange={this.handleEditFormChange}
			          		/>
			          		<p>Date:</p>
			          		<Form.Input 
			            		type="text"
			            		name="date"
			            		value={this.state.date}
			            		onChange={this.handleEditFormChange}
			          		/>
			          		<Modal.Actions>
			          			<Button type="Submit">Edit Race</Button>
			          		</Modal.Actions>
			        	</Form>
	        	</Modal.Content>
	        </Modal>
	        </div>
	    )
	}
}


export default EditRace
