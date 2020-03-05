import React, { Component } from 'react'
import { Button, Form, Header, Modal } from 'semantic-ui-react'


class EditWorkout extends Component {

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

  	componentDidMount() {

  		this.setState({
  			trainingFor: this.props.workoutToEdit.trainingFor,
  			weekNumber: this.props.workoutToEdit.weekNumber,
  			dayOfTheWeek: this.props.workoutToEdit.dayOfTheWeek,
  			duration: this.props.workoutToEdit.duration,
  			distance: this.props.workoutToEdit.distance
  		})
  	}

  	handleEditWorkoutChange = (event) => {
    	this.setState({
      		[event.target.name]: event.target.value
    	})
  	}

  	handleEditWorkoutSubmit = (event) => {
    	event.preventDefault()

    	this.props.updateWorkout(this.state)
  	}


  	render() {

	    return(
	    	<div>
	    	<Modal open={true} onClose={(e)=>{this.props.closeEditModal()}} closeIcon>
	    		<Modal.Content>
	    			<Header>
	    				<h4>Edit workout:</h4>
	        		</Header>
	    				<Form onSubmit={this.handleEditWorkoutSubmit}>
	        				<p>Training For:</p>
			        		<Form.Input 
			            		type="text"
			            		name="trainingFor"
			            		value={this.state.trainingFor}
			            		onChange={this.handleEditWorkoutChange}
			          		/>
			          		<p>Week #:</p>
			          		<Form.Input
			            		type="text"
			            		name="weekNumber"
			            		value={this.state.weekNumber}
			            		onChange={this.handleEditWorkoutChange}
			          		/>         
			          		<p>Day of the Week + Date: (ex. Fri 3/7/20)</p>
			          		<Form.Input 
			            		type="text"
			            		name="dayOfTheWeek"
			            		value={this.state.dayOfTheWeek}
			            		onChange={this.handleEditWorkoutChange}
			          		/>
			          		<p>Duration + Type of Workout: (ex. 20 min run)</p>
			          		<Form.Input 
			            		type="text"
			            		name="duration"
			            		value={this.state.duration}
			            		onChange={this.handleEditWorkoutChange}
			          		/>
			          		<p>Distance:</p>
			          		<Form.Input 
			            		type="text"
			            		name="distance"
			            		value={this.state.distance}
			            		onChange={this.handleEditWorkoutChange}
			          		/>
			          		<Modal.Actions>
			          			<Button type="Submit">Edit Workout</Button>
			          		</Modal.Actions>
			        	</Form>
	        	</Modal.Content>
	        </Modal>
	        </div>
	    )
	}
}


export default EditWorkout