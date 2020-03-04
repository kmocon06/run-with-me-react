import React, { Component } from 'react'
import RaceList from '../RaceList'
import NewRaceForm from '../NewRaceForm'
import RaceIndex from '../RaceIndex'
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
			idOfRace: -1,
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
			const oneRaceResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/races' + raceId, {
				credentials: 'include',
				method: 'GET',
    			body: JSON.stringify(raceId), 
    			headers: {
        			'Content-Type': 'application/json'
        		}
			})

			const oneRaceJson = await oneRaceResponse.json()

			this.setState({
				idOfRace: oneRaceJson.data
			})

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


	render() {
		const { path, url } = this.props.match;

		console.log(this.state.races);
		

		return(
			<div className="RaceContainer">
			    <Button onClick={this.props.logout}>Logout</Button>
				<Button className="NewButton" onClick={this.newRaceFormOpen}>Add a Race</Button>
				<Button className="TrainingButton">Training</Button>

			<Switch>

				<Route path={`/:id`}>
		            <RaceIndex findOneRace={this.findOneRace} idOfRace={this.state.idOfRace} />
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


			</div>

		)
	}
}








export default withRouter(RaceContainer)