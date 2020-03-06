import React, { Component } from 'react'
import { List, Table, Button } from 'semantic-ui-react'
import RaceIndex from '../RaceIndex'
import { Link } from 'react-router-dom'

function RaceList(props) {

	const races = props.races.map((race) => {
		return (
      	<Table.Row key={race.id}>
        	<Table.Cell><Link to={`/${race._id}`}>{race.name}</Link></Table.Cell>
        	<Table.Cell>{race.distance}</Table.Cell>
        	<Table.Cell>{race.date}</Table.Cell>
        	<Table.Cell>{race.location}</Table.Cell>
      	</Table.Row>
		)
	})

	return (
		<div>
				<List>
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
			           {races}
                 </Table.Body>
    					</Table>
					</List.Item>
				</List>
		</div>
	)
}








export default RaceList
