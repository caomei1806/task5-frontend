import React, { useCallback, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { Message } from '../models/Message'
import { useGlobalContext } from '../context'
import axios from 'axios'
import { URL } from '../setup'

const MessageList = () => {
	const { user, messages, trigger } = useGlobalContext()
	const [triggering, setTriggering] = useState<Boolean>(false)
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
