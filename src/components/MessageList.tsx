import React, { useCallback, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { useGlobalContext } from '../context'

const MessageList = () => {
	const { messages } = useGlobalContext()
	return (
		<div>
			<Table striped bordered hover size='sm'>
				<thead>
					<tr>
						<th>From</th>
						<th>Title</th>
						<th>Body</th>
					</tr>
				</thead>
				<tbody>
					{messages?.map((message, index) => (
						<tr key={`message-${index}`}>
							<td>{message.user}</td>
							<td>{message.title}</td>
							<td>{message.body}</td>
						</tr>
					))}
				</tbody>
			</Table>
		</div>
	)
}

export default MessageList
