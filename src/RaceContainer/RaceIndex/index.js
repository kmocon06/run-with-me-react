import React, { Component } from 'react'
import { useParams } from 'react-router-dom'

function RaceIndex(props) {
	let { id, name } = useParams();
	//const race = this.props.idOfRace
	console.log("raceId:", id)
	console.log(props)
	//console.log(this.props.raceId)
	//console.log(this.props.race.name)
	console.log(props.races)
	//console.log(race)
	console.log(id)

	for(let i = 0; i < props.races.length; i++) {
		if(props.races[i]._id === id) {

			// for(let j = 0; j < props.races[i].runners.length; j++) {
			// 	const currentRunners = props.races[i].runners[j]
				return (
					<div>
						<button>Sign up!</button>
						<h1>{props.races[i].name}</h1>
						<p>{props.races[i].distance}</p>
						<p>{props.races[i].date}</p>
						<p>{props.races[i].location}</p>
						<h1>Runners</h1>
					</div>
				)
			//}
		}
	}

	return (
		<h1>RaceIndex</h1>

	)
}



export default RaceIndex