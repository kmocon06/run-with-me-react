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
	console.log(name);
	return (
		<div>
			<h1>Race Index</h1>
			<p> { id } </p>
			<p> { name } </p>
		</div>
	)
}



export default RaceIndex