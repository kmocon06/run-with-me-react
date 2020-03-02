import React, { Component } from 'react'
import RaceList from '../RaceList'


class RaceContainer extends Component {
	constructor(props) {
		super(props)

		this.state = {
			races: []
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

	render() {
		return(
			<div className="RaceContainer">
			<h1>All the Races</h1>
			<RaceList races={this.state.races}/>
			</div>
		)
	}
}








export default RaceContainer