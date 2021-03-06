import React, { Component } from 'react'
import { Button, Form, Header, Modal } from 'semantic-ui-react'


class NewWorkout extends Component {

	constructor(props) {
		super(props)

		this.state = {
    		trainingFor: '',
			weekNumber: null,
			dayOfTheWeek: '',
			duration: '',
			distance: '',
			workoutCompleted: false,
    	}
  	}

  	handleNewWorkoutChange = (event) => {
    	this.setState({
      		[event.target.name]: event.target.value
    	})
  	}

  	handleNewWorkoutSubmit = (event) => {
    	event.preventDefault()

    	this.props.createWorkout(this.state)

    	//reset the state of the workout after form is submitted
    	this.setState({
       		trainingFor: '',
			weekNumber: null,
			dayOfTheWeek: '',
			duration: '',
			distance: '',
			workoutCompleted: false,
    	})
  	}


  	render() {

	    return(
	    	<div>
	    	<Modal open={this.props.newWorkoutModalOpen} closeIcon={true} onClose={this.props.closeNewWorkout}>
	    		<Modal.Content>
	    			<Header>
	    				<h4>Add a new workout:</h4>
	        		</Header>
	    				<Form onSubmit={this.handleNewWorkoutSubmit}>
	        				<p>Training For:</p>
			        		<Form.Input 
			            		type="text"
			            		name="trainingFor"
			            		value={this.state.trainingFor}
			            		onChange={this.handleNewWorkoutChange}
			          		/>
			          		<p>Week #:</p>
			          		<Form.Input
			            		type="text"
			            		name="weekNumber"
			            		value={this.state.weekNumber}
			            		onChange={this.handleNewWorkoutChange}
			          		/>         
			          		<p>Day of the Week + Date: (ex. Fri 3/7/20)</p>
			          		<Form.Input 
			            		type="text"
			            		name="dayOfTheWeek"
			            		value={this.state.dayOfTheWeek}
			            		onChange={this.handleNewWorkoutChange}
			          		/>
			          		<p>Duration + Type of Workout: (ex. 20 min run)</p>
			          		<Form.Input 
			            		type="text"
			            		name="duration"
			            		value={this.state.duration}
			            		onChange={this.handleNewWorkoutChange}
			          		/>
			          		<p>Distance:</p>
			          		<Form.Input 
			            		type="text"
			            		name="distance"
			            		value={this.state.distance}
			            		onChange={this.handleNewWorkoutChange}
			          		/>
			          		<Modal.Actions>
			          			<Button type="Submit">Add a Workout</Button>
			          		</Modal.Actions>
			        	</Form>
	        	</Modal.Content>
	        </Modal>
	        </div>
	    )
	}
}


export default NewWorkout