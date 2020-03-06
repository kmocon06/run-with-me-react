import React, { Component } from 'react'
import RaceList from './RaceList'
import NewRaceForm from './NewRaceForm'
import RaceIndex from './RaceIndex'
import EditRace from './EditRace'
import { Button, Header, Segment } from 'semantic-ui-react'
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
			indexOfRace: -1,
			trainingOpen: false,
			loggedInUserId: this.props.loggedInUserId,
			raceAdmin: null,
			idOfRace: -1
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
		// this.updateRace()
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
	// findOneRace = async (raceId) => {
	// 	try {


	// 		const oneRaceResponse = await fetch(process.env.REACT_APP_API_URL + '/api/v1/races/' + raceId, {
	// 			credentials: 'include',
	// 			method: 'GET',
 //    			body: JSON.stringify(raceId), 
 //    			headers: {
 //        			'Content-Type': 'application/json'
 //        		}
	// 		})

	// 		console.log('this is oneRaceResponse')
	// 		console.log(oneRaceResponse)
	// 		const oneRaceJson = await oneRaceResponse.json()

	// 		if(oneRaceJson.status === 200) {
	//     		const races = this.state.races
	//       		let indexOfRace = 0

	//     		for(let i = 0; i < races.length; i++) {

	//       			if(races[i]._id === raceId) {
	//         			indexOfRace = i
	//       			}

	// 				this.setState({
	// 					indexOfRace: indexOfRace
	// 				})
	//       		}
	//       	}

	// 			console.log('this is oneRaceJson');
	// 			console.log(oneRaceJson)
	// 			console.log(raceId);


	// 	} catch(err) {
	// 		console.log(err)
	// 	}
	// }


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

	//DESTROY race if user is the admin and created the race
  	//DELETE /id
	deleteRace = async (id) => {
   		try {

      		const deleteRaceResponse = await fetch(process.env.REACT_APP_API_URL + "/api/v1/races/" + id, {
        		credentials: 'include',
        		method: 'DELETE'
      		})

      		const deleteRaceJson = await deleteRaceResponse.json()

      		if(deleteRaceJson.status === 200) {
	    		const races = this.state.races
	      		let indexOfRace = 0

	    		for(let i = 0; i < races.length; i++) {

	      			if(races[i]._id === id && this.state.loggedInUserId === races[i].admin) {
	        			indexOfRace = i
	      			}
	      		}
	    			races.splice(indexOfRace, 1)

	      			this.setState({ 
	      				races: races
	      			})
               
      		} else {
        			throw new Error("Unable to delete this race")
        	}

    	} catch(err) {
      		console.error(err)
    	}
	}

	//EDIT a race if the user logged in is the race admin
	//GET /id
	//need the id of race we want to edit
	editRace = (idOfRace) => {

    	this.setState({
      		idOfRace: idOfRace
    	})
  	}

  	//be able to update race with a runner
  	//UPDATE race
  	//get the id of the current race
  	//PUT
  	updateRaceWithRunner = async (raceId) => {

    	try {
    		// console.log('raceId >>>> ',raceId);
    		const updateRaceResponse = await fetch(
      			process.env.REACT_APP_API_URL + "/api/v1/races/" + raceId, 
      			{
      				credentials: 'include',
        			method: 'PUT',
        			headers: {
          				'Content-Type': 'application/json'
        			}
      			}
    		)

    		const updatedRaceJson = await updateRaceResponse.json()

    		console.log("updatedRaceJson >>> ", updatedRaceJson);

    		if(updateRaceResponse.status === 200) {
        
    			// const newArrayWithUpdatedRace = this.state.races.map((race) => {
          			
       //    			if(race._id === this.state.idOfRace) {
       //      			return updatedRaceJson.data
       //    			} else {
       //      			return race
       //    			}
       //  		})

       			
       			console.log("!!!!!!!!!!!!!!", updatedRaceJson.data.runners);

        		this.findRaces()

        	}

    	} catch(err) {
    		console.log(err)
    	}
    }

	closeEditModal = () => {
		this.setState({
			idOfRace: -1
		})
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

	closeTraining = () => {
		this.setState({
			trainingOpen: false
		})
	}


	//if the name of the user who is logged in is not already in the
			//array (if their index is -1), then they should be pushed
			//into the array of runners
			// if(oneRace.runners.indexOf(req.session.name) === -1) {
			// 	oneRace.runners.push(req.session.name)
			// 	oneRace.save()	
			// }

	//if the user's name isn't already in the runner's array
	//then push the user's name into the array on the sign up click
	// signUpForRace = () => {
	// 	const races = this.state.races

	// 	for(let i = 0; i < races.length; i++) {
	// 		console.log(races[i]);
	// 		for(let j = 0; j < races[i].runners.length; j++) {
	// 			console.log(races[i].runners[j]);
	// 		}
	// 	}
	// }


	//be able to update the edited race
  	//UPDATE race
  	//get the id of the current race
  	//PUT
	updateRace = async (raceId) => {

    	try {
    		console.log('this is the race id ',raceId);
    		const updateRaceResponse = await fetch(
      			process.env.REACT_APP_API_URL + "/api/v1/races/admin/" + raceId, 
      			{
      				credentials: 'include',
        			method: 'PUT',
        			body: JSON.stringify(raceId), 
        			headers: {
          				'Content-Type': 'application/json'
        			}
      			}
    		)

    		const updatedRaceJson = await updateRaceResponse.json()

    		console.log("this is the updatedRaceJson ", updatedRaceJson);

    		if(updateRaceResponse.status === 200) {
        
    			const newArrayWithUpdatedRace = this.state.races.map((race) => {
          			
          			if(race._id === this.state.idOfRace) {
            			return updatedRaceJson.data
          			} else {
            			return race
          			}
        		})

        		this.setState({
          			races: updatedRaceJson.data
        		})

            	this.closeEditModal()

        	}

    	} catch(err) {
    		console.log(err)
    	}
    }

	render() {
		const { path, url } = this.props.match;

		console.log('this is the state of races in RaceContainer');
		console.log(this.state.races);
		console.log('this is the loggedInUserId in RaceContainer');
		console.log(this.state.loggedInUserId);
		//console.log(this.state.trainingOpen);
		//console.log(this.state);
		

		return(
			<div className="RaceContainer">
			    <Button onClick={this.props.logout}>Logout</Button>
				<Button className="NewButton" onClick={this.newRaceFormOpen}>Add a Race</Button>
				<Button className="RacesButton" onClick={this.closeTraining}><Link to="/">Races</Link></Button>
				<Button className="TrainingButton" onClick={this.openTraining}>Training</Button>
				{
					this.state.trainingOpen
					?
					<WorkoutContainer loggedInUserId={this.state.loggedInUserId}/>
					:
			<Switch>

				<Route path={`/:id`}>
		            <RaceIndex 
		            	races={this.state.races} 
		            	idOfRace={this.state.idOfRace} 
		            	signUpForRace={this.signUpForRace} 
		            	loggedInUserId={this.state.loggedInUserId}
		            	deleteRace={this.deleteRace}
		            	updateRaceWithRunner={this.updateRaceWithRunner} 
		            	updateRace={this.updateRace}
		            	 />
		            {
          				this.state.idOfRace !== -1 
          				? 
		         		<EditRace 
		            		raceToEdit={this.state.races.find((race) => race._id === this.state.idOfRace)}
		            		editRace={this.editRace}
		            		updateRace={this.updateRace} 
		            		closeEditModal={this.closeEditModal}
		            	/>
          				:
          				null
        	 		}
		        </Route>

				<Route path={path}>
					<Segment inverted>
						<Header as='h3' block textAlign="center" inverted color="white">
    						Races You Can Sign Up For
  						</Header>
  					</Segment>
					<RaceList races={this.state.races} 
						createRace={this.createRace}
						newRaceFormOpen={this.state.newRaceFormOpen} 
						closeNewRaceForm={this.closeNewRaceForm} />
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