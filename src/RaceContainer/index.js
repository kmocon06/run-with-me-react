import React, { Component } from 'react'
import RaceList from '../RaceList'
import NewRaceForm from '../NewRaceForm'
import { Button } from 'semantic-ui-react'

class RaceContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			races: [],
			newFormOpen: false
		}

	}

	//loading data
	componentDidMount() {
		this.findRaces()
	}

	findRaces = async () => {
		try {
			const allRacesResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/races', {
				credentials: 'include'
			})

			const allRacesJson = await allRacesResponse.json()

			this.setState({
				races: allRacesJson.data
			})

		} catch(err) {
			console.log(err)
		}
	}

	createRace = async (newRace) => {
		try {
			const newRaceResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/races/new', {
				credentials: 'include', 
				method: 'POST',
    			body: JSON.stringify(newRace), 
    			headers: {
        			'Content-Type': 'application/json'
        		}
			})

			const newRaceJson = await newRaceResponse.json()

			//if the status is 201 then we can add the new race
      		if(newRaceResponse.status === 201) {
        		//... (all races with spread operator)
        		//and then add the race we just created 
        		this.setState({
          			races: [...this.state.races, newRaceJson.data]
       			})

            this.closeNewRaceForm()

      		}

		} catch(err) {
			console.log(err)
		}
	}

	//open the new race form when button is clicked
	newRaceFormOpen = () => {
		this.setState({
			newFormOpen: true
		})
	}

	//close the new race form when race is added or on X click
	closeNewRaceForm = () => {
		this.setState({
			newFormOpen: false
		})
	}

	render() {
		console.log(this.state)

		return(
			<div className="RaceContainer">
			<h1>All the Races</h1>
				<Button className="NewButton" onClick={this.newRaceFormOpen}>Add a Race</Button>
			<NewRaceForm 
				createRace={this.createRace}
				newRaceFormOpen={this.state.newFormOpen}
				closeNewRaceForm={this.closeNewRaceForm}
			/>
			<RaceList races={this.state.races} />
			</div>
		)
	}
}








export default RaceContainer