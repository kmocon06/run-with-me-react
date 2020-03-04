import React, { Component } from 'react'
import { Button } from 'semantic-ui-react'
import WorkoutList from './WorkoutList'



class WorkoutContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			userWorkouts: [],
			loggedInUserId: this.props.loggedInUserId	
		}
	}

	componentDidMount() {
		this.findUserWorkouts()
	}

	//get all workouts for user 
	findUserWorkouts = async (data) => {

		const currentUser = this.state.loggedInUserId
		console.log(process.env.REACT_APP_API_URL + '/api/v1/' + this.props.loggedInUserId + '/workouts');

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

	render() {

		console.log(this.state);

		return (
			<div className="WorkoutContainer">
				<h1>WorkoutContainer</h1>
			<Button className="NewButton" >Add a new Workout</Button>
			<WorkoutList userWorkouts={this.state.userWorkouts} />
			</div>
		)
	}



}



export default WorkoutContainer