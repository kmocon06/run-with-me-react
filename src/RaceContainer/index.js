import React, { Component } from 'react'
import RaceList from './RaceList'
import NewRaceForm from './NewRaceForm'
import RaceIndex from './RaceIndex'
import { Button } from 'semantic-ui-react'
import WorkoutContainer from '../WorkoutContainer'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
  withRouter
} from 'react-router-dom'

class RaceContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			races: [],
			newFormOpen: false,
			indexOfRace: 0,
			trainingOpen: false,
			loggedInUserId: this.props.loggedInUserId,
		}

	}

	//loading data
	componentDidMount() {
		// console.log(this.state)
		// const match = useRouteMatch()
		// console.log("this is match ", match);

		// this.setState({
		// 	match:match
		// })
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

	//get race by ID
	//get one race
	//GET /races/:id
	//get once race with the id
	findOneRace = async (raceId) => {
		try {
			const oneRaceResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/races/' + raceId, {
				credentials: 'include',
				method: 'GET',
    			body: JSON.stringify(raceId), 
    			headers: {
        			'Content-Type': 'application/json'
        		}
			})

			console.log('this is oneRaceResponse')
			console.log(oneRaceResponse)
			const oneRaceJson = await oneRaceResponse.json()

			if(oneRaceJson.status === 200) {
	    		const races = this.state.races
	      		let indexOfRace = 0

	    		for(let i = 0; i < races.length; i++) {

	      			if(races[i]._id === raceId) {
	        			indexOfRace = i
	      			}

					this.setState({
						indexOfRace: indexOfRace
					})
	      		}
	      	}

				console.log('this is oneRaceJson');
				console.log(oneRaceJson)
				console.log(raceId);


		} catch(err) {
			console.log(err)
		}
	}


	//CREATE 
	//POST /new
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

	openTraining = () => {
		this.setState({
			trainingOpen: true
		})
	}


	render() {
		const { path, url } = this.props.match;

		console.log(this.state.races);
		//console.log(this.state.trainingOpen);
		console.log(this.state);
		

		return(
			<div className="RaceContainer">
			    <Button onClick={this.props.logout}>Logout</Button>
				<Button className="NewButton" onClick={this.newRaceFormOpen}>Add a Race</Button>
				<Button className="TrainingButton" onClick={this.openTraining}>Training</Button>
				{
					this.state.trainingOpen
					?
					<WorkoutContainer loggedInUserId={this.state.loggedInUserId}/>
					:
			<Switch>

				<Route path={`/:id`}>
		            <RaceIndex races={this.state.races} idOfRace={this.state.idOfRace} />
		        </Route>

				<Route path={path}>
					<RaceList races={this.state.races} />
					<NewRaceForm 
						createRace={this.createRace}
						newRaceFormOpen={this.state.newFormOpen}
						closeNewRaceForm={this.closeNewRaceForm}
					/>
				</Route>


			</Switch>
				}


			</div>

		)
	}
}








export default withRouter(RaceContainer)