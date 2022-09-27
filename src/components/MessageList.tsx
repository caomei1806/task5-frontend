import React, { useCallback, useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { Message } from '../models/Message'
import { useGlobalContext } from '../context'
import axios from 'axios'
const URL = 'http://localhost:5000/api/v1'

const MessageList = () => {
	const { user } = useGlobalContext()
	const [messages, setMessages] = useState<Message[]>()
	const getMessages = async () => {
		if (user) {
			console.log(user)
			const res = await axios.get(`${URL}/messages/${user}`)
			const data = await res
			const newMessages: Message[] = []
			const recievedMessages = data.data.messages as Message[]
			recievedMessages.map(async (message: Message) => {
				const userId = message.user.toString()
				await axios
					.post(`${URL}/user`, {
						userId,
					})
					.then((data) => {
						const { name: username } = data.data.user
						const newMessage: Message = {
							user: username,
							title: message.title,
							body: message.body,
						}
						newMessages.push(newMessage)
					})
			})
			console.log(newMessages)
			setMessages(newMessages)
		}
	}
	const display = () => {
		return messages?.map((message, index) => {
			return (
				<tr key={`message-${index}`}>
					<td>{message.user}</td>
					<td>{message.title}</td>
					<td>{message.body}</td>
				</tr>
			)
		})
	}
	useEffect(() => {
		const timeout = setTimeout(() => {
			if (!messages) {
				getMessages()
			}
			console.log('triggered')
		}, 600)
		return () => clearTimeout(timeout)
	}, [user])
	useEffect(() => {
		const timeout = setTimeout(() => {
			display()
			console.log('trying to display')
		}, 500)
		return () => clearTimeout(timeout)
	}, [messages])
	return (
		<Table striped bordered hover size='sm'>
			<thead>
				<tr>
					<th>From</th>
					<th>Title</th>
					<th>Body</th>
				</tr>
			</thead>
			<tbody>{display()}</tbody>
		</Table>
	)
}

export default MessageList
