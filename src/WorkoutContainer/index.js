import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import WorkoutList from './WorkoutList'
import NewWorkout from './NewWorkout'
import EditWorkout from './EditWorkout'



class WorkoutContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userWorkouts: [],
			loggedInUserId: this.props.loggedInUserId,
			newWorkoutModalOpen: false,	
			idOfWorkout: -1
		}
	}

	componentDidMount() {
		this.findUserWorkouts()
	}

	//get all workouts for user 
	//GET /:userId/workouts
	findUserWorkouts = async (data) => {

		const currentUser = this.state.loggedInUserId

		try {
			const allWorkoutsResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/' + this.props.loggedInUserId + '/workouts', {
				credentials: 'include',
				method: 'GET',
    			body: JSON.stringify(data), 
    			headers: {
        			'Content-Type': 'application/json'
        		}
			})

			const allWorkoutsJson = await allWorkoutsResponse.json()

			if(allWorkoutsResponse.status === 200) {

        		this.setState({
        			userWorkouts: allWorkoutsJson.data
        		})
      		} 

		} catch(err) {
			console.log(err)
		}
	}

	//CREATE 
	//POST workouts/new
	createWorkout = async (newWorkout) => {
		try {
			const newWorkoutResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/workouts/new', {
				credentials: 'include', 
				method: 'POST',
    			body: JSON.stringify(newWorkout), 
    			headers: {
        			'Content-Type': 'application/json'
        		}
			})

			const newWorkoutJson = await newWorkoutResponse.json()

      		if(newWorkoutResponse.status === 201) {
        		this.setState({
          			userWorkouts: [...this.state.userWorkouts, newWorkoutJson.data]
       			})

            this.closeNewWorkout()

      		}

		} catch(err) {
			console.log(err)
		}
	}

	openNewWorkout = () => {
		this.setState({
			newWorkoutModalOpen: true
		})
	}

	closeNewWorkout = () => {
		this.setState({
			newWorkoutModalOpen: false
		})
	}

	closeEditModal = () => {
		this.setState({
			idOfWorkout: -1
		})
	}

	//EDIT workout
	//GET /id
	//need the id of workout we want to edit
	editWorkout = (idOfWorkout) => {

    	this.setState({
      		idOfWorkout: idOfWorkout
    	})
  	}

	//DESTROY your workout
  	//DELETE /id
	deleteWorkout = async (id) => {
   		try {

   			console.log('this should be the workout id');
   			console.log(id);

      		const deleteWorkoutResponse = await fetch(process.env.REACT_APP_API_URL + "/api/v1/workouts/" + id, {
        		credentials: 'include',
        		method: 'DELETE'
      		})

      		const deleteWorkoutJson = await deleteWorkoutResponse.json()

      		if(deleteWorkoutJson.status === 200) {
	    		const userWorkouts = this.state.userWorkouts
	      		let indexOfWorkout = 0

	    		for(let i = 0; i < userWorkouts.length; i++) {

	      			if(userWorkouts[i].id === id) {
	        			indexOfWorkout = i
	      			}
	      		}

	      		//remove workout from array
	    		userWorkouts.splice(indexOfWorkout, 1)

	      		this.setState({ 
	      			userWorkouts: userWorkouts
	      		})
               
      		} else {
        		throw new Error("Unable to delete this workout")
      		}

    	} catch(err) {
      		console.error(err)
    	}
	}

	render() {

		console.log(this.state);
		console.log(this.state.idOfWorkout);

		return (
			<div className="WorkoutContainer">
				<h1>WorkoutContainer</h1>
			<Button className="NewButton" onClick={this.openNewWorkout}>Add a new Workout</Button>
			<NewWorkout createWorkout={this.createWorkout}
				newWorkoutModalOpen={this.state.newWorkoutModalOpen}
				closeNewWorkout={this.closeNewWorkout} />
			<WorkoutList userWorkouts={this.state.userWorkouts} 
				workoutToEdit={this.state.userWorkouts.find((workout) => workout._id === this.state.idOfWorkout)}
				deleteWorkout={this.deleteWorkout}
				editWorkout={this.editWorkout}
			/>
			 {
          		this.state.idOfWorkout !== -1 
          		? 
          		<EditWorkout
          			workoutToEdit={this.state.userWorkouts.find((workout) => workout._id === this.state.idOfWorkout)}
                	closeEditModal={this.closeEditModal}
          		/>
          		:
          		null
        	 }
			</div>
		)
	}



}



export default WorkoutContainer