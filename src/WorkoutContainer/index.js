import React, { Component } from 'react'


class WorkoutContainer extends Component {
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

	render() {
		return (
			<div className="WorkoutContainer">
				<h1>WorkoutContainer</h1>
			</div>
		)
	}



}



export default WorkoutContainer