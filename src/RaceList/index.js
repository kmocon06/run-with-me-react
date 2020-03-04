import React, { Component } from 'react'
import { List, Table } from 'semantic-ui-react'
import RaceIndex from '../RaceIndex'
import { Link } from 'react-router-dom'

function RaceList(props) {

	const races = props.races.map((race) => {
		return (
			<div>
				<List key={race.id}>
					<List.Item> 
						<Table fixed>
    						<Table.Header>
      							<Table.Row>
        							<Table.HeaderCell>Name</Table.HeaderCell>
        							<Table.HeaderCell>Distance</Table.HeaderCell>
        							<Table.HeaderCell>Date</Table.HeaderCell>
        							<Table.HeaderCell>Location</Table.HeaderCell>
      							</Table.Row>
    						</Table.Header>

      						<Table.Body>
      							<Table.Row>
        							<Table.Cell><Link to={`/${race._id}`}>{race.name}here</Link></Table.Cell>
        							<Table.Cell>{race.distance}</Table.Cell>
        							<Table.Cell>{race.date}</Table.Cell>
        							<Table.Cell>{race.location}</Table.Cell>
      							</Table.Row>
        					</Table.Body>
    					</Table>
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
