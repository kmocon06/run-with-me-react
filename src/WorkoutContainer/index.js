import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import WorkoutList from './WorkoutList'
import NewWorkout from './NewWorkout'



class WorkoutContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userWorkouts: [],
			loggedInUserId: this.props.loggedInUserId,
			newWorkoutModalOpen: false,	
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

			console.log(allWorkoutsResponse);

			const allWorkoutsJson = await allWorkoutsResponse.json()

			if(allWorkoutsResponse.status === 200) {

        		this.setState({
        			userWorkouts: allWorkoutsJson.data
        		})
      		} 

      		console.log(allWorkoutsJson);

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


	render() {

		console.log(this.state);

		return (
			<div className="WorkoutContainer">
				<h1>WorkoutContainer</h1>
			<Button className="NewButton" onClick={this.openNewWorkout}>Add a new Workout</Button>
			<NewWorkout createWorkout={this.createWorkout}
				newWorkoutModalOpen={this.state.newWorkoutModalOpen}
				closeNewWorkout={this.closeNewWorkout} />
			<WorkoutList userWorkouts={this.state.userWorkouts} />
			</div>
		)
	}



}



export default WorkoutContainer