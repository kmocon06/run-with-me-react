import React, { Component } from 'react'
import { List } from 'semantic-ui-react'

function RaceList(props) {
	const races = props.races.map((race) => {
		return (
			<div>
				<List key={race.id}>
					<List.Item> 
						<h1>{race.name}</h1>
					</List.Item>
				</List>
			</div>
		)
	})

	return (
		<ul>
			{races}
		</ul>

	)
}








export default RaceList
