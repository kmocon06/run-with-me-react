import React, { Component } from 'react'
import { List, Table } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

function WorkoutList(props) {

  	const userWorkouts = props.userWorkouts.map((workout) => {
        return(   
        							<Table.Row key={workout.id}>
          							<Table.Cell>{workout.trainingFor}</Table.Cell>
          							<Table.Cell>{workout.weekNumber}</Table.Cell>
          							<Table.Cell>{workout.dayOfTheWeek}</Table.Cell>
                        <Table.Cell>{workout.duration}</Table.Cell>
                        <Table.Cell>{workout.distance}</Table.Cell>
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
        							<Table.HeaderCell>Training For</Table.HeaderCell>
        							<Table.HeaderCell>Week #</Table.HeaderCell>
                      <Table.HeaderCell>Day of the Week</Table.HeaderCell>
        							<Table.HeaderCell>Date</Table.HeaderCell>
        							<Table.HeaderCell>Location</Table.HeaderCell>
      							</Table.Row>
    						</Table.Header>

      						<Table.Body>
                        {userWorkouts}
        					</Table.Body>
    					</Table>
					</List.Item>
				</List>
			</div>
		)
}

export default WorkoutList