import React, { Component } from 'react'
import { Button, Form, Header, Modal } from 'semantic-ui-react'


class NewRaceForm extends Component {

	constructor(props) {
		super(props)

		this.state = {
    		name: '',
    		distance: '',
    		location: '',
    		date: ''
    	}
  	}

  	handleNewFormChange = (event) => {
		//handles the change of each event and its value
    	this.setState({
      		[event.target.name]: event.target.value
    	})
  	}

  	handleNewFormSubmit = (event) => {
  		//default action shouldn't be taken, prevent default
    	event.preventDefault()

    	this.props.createRace(this.state)

    	//reset the state of the race after form is submitted
    	this.setState({
       		name: '',
    		distance: '',
    		location: '',
    		date: ''
    	})
  	}


  	render() {

  		//console.log(this.state);

	    return(
	    	<div>
	    	<Modal open={this.props.newRaceFormOpen} closeIcon={true} onClose={this.props.closeNewRaceForm}>
	    		<Modal.Content>
	    			<Header>
	    				<h4>Add a new race:</h4>
	        		</Header>
	    				<Form onSubmit={this.handleNewFormSubmit}>
	        				<p>Name:</p>
			        		<Form.Input 
			            		type="text"
			            		name="name"
			            		value={this.state.name}
			            		onChange={this.handleNewFormChange}
			          		/>
			          		<p>Distance:</p>
			          		<Form.Input
			            		type="text"
			            		name="distance"
			            		value={this.state.distance}
			            		onChange={this.handleNewFormChange}
			          		/>         
			          		<p>Location:</p>
			          		<Form.Input 
			            		type="text"
			            		name="location"
			            		value={this.state.location}
			            		onChange={this.handleNewFormChange}
			          		/>
			          		<p>Date:</p>
			          		<Form.Input 
			            		type="text"
			            		name="date"
			            		value={this.state.date}
			            		onChange={this.handleNewFormChange}
			          		/>
			          		<Modal.Actions>
			          			<Button type="Submit">Add Race</Button>
			          		</Modal.Actions>
			        	</Form>
	        	</Modal.Content>
	        </Modal>
	        </div>
	    )
	}
}


export default NewRaceForm