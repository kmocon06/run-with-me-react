import React, { Component } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container } from 'semantic-ui-react'


function RaceIndex(props) {
	let { id, name } = useParams();
	//const race = this.props.idOfRace
	console.log("raceId:", id)
	console.log("props >>>> ", props)
	console.log(props.races);

	//if the current id of the race is the same as the race id
	//and the admin of the race is the current user,
	//then we should be able to edit/update, and delete that race

	// find the right race using the race._id in props
	const race = props.races.filter(race => race._id === id)
	// if race.length<1 , display a "this race doesn't exist" message and a Link to race list

	if(race.length>0) {
		console.log("########", props.idOfRace);
			console.log('runners in a race', race[0].runners);

			const runners = race[0].runners.map((runner)=>{
			//if(race[0].runners[0].length >= 0) {

				return(
					<div>
					<p> Name: {runner.name} </p>
					<p> Hometown: {runner.hometown} </p>
					</div>
					)
			//}
			})

			const buttons = race[0].admin == props.loggedInUserId ? <button onClick={()=> props.deleteRace(race[0]._id)}>Delete</button> : null
	
		return (
			<React.Fragment>
			<div className="ui raised very padded text container segment">
				<button onClick={()=> props.updateRaceWithRunner(race[0]._id)}>Sign up!</button>
					<h2 className="header">{race[0].name}</h2>
					<p>{race[0].distance}</p>
					<p>{race[0].date}</p>
					<p>{race[0].location}</p>
			</div>
			<div className="ui raised very padded text container segment">
					<h1 className="header">Runners</h1>
					{runners}
					{buttons}
			</div>
		</React.Fragment>
		)
	}
	else {
		return (
			<div>
				<h1>Your race has been removed!</h1>
				<Link to="/">Back to Home</Link>
			</div>
		)
	}
}



export default RaceIndex