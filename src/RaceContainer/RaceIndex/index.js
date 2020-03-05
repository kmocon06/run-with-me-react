import React, { Component } from 'react'
import { useParams } from 'react-router-dom'

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

	console.log(race);



	const runners = race[0].runners.map((runner)=>{
		return(
			<div>
			<p> Name: {runner.name} </p>
			<p> Hometown: {runner.hometown} </p>
			</div>
			)
	})

	const buttons = race[0].admin == props.loggedInUserId ? <button>Delete</button> : null;
	// for(let i = 0; i < props.races.length; i++) {
	// 	if(props.races[i]._id === id) {



	// 		 for(let j = 0; j < props.races[i].runners.length; j++) {
	// 		 	const currentRunners = props.races[i].runners[j]

	// 			return (
	// 				<div>
	// 					<h1>{props.races[i].name}</h1>
	// 					<p>{props.races[i].distance}</p>
	// 					<p>{props.races[i].date}</p>
	// 					<p>{props.races[i].location}</p>
						
						
	// 					<h1>Runners</h1>
	// 					<p>{props.races[i].runners[j].name}</p>
	// 				</div>
	// 			)
	// 		}
	// 	}
	// }

	return (
		<div>
			<button onClick={()=> props.updateRaceWithRunner(race[0]._id)}>Sign up!</button>
				{buttons}
				<h1>{race[0].name}</h1>
				<p>{race[0].distance}</p>
				<p>{race[0].date}</p>
				<p>{race[0].location}</p>
				<h1>Runners</h1>
				{runners}
		</div>

	)
}



export default RaceIndex