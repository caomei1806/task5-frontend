import axios from 'axios'
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useGlobalContext } from '../context'
import { Message } from '../models/Message'
import { Typeahead } from 'react-bootstrap-typeahead'
import { User } from '../models/User'
import { URL } from '../setup'

const SendMessageForm = () => {
	const { user, users } = useGlobalContext()
	const clearForm: Message = {
		_id: '',
		recipient: '',
		title: '',
		body: '',
		user: '',
	}
	const [newMessage, setNewMessage] = useState<Message>(clearForm)
	const sendMessage = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		if (newMessage?.recipient && newMessage.title) {
			await axios
				.post(`${URL}/messages/${user}`, {
					recipient: newMessage.recipient,
					title: newMessage.title,
					body: newMessage.body,
				})
				.then((created) => {
					console.log(created)
					setNewMessage(clearForm)
				})
		}
	}
	return (
		<Form className='w-50'>
			<Typeahead
				id='labelkey-example'
				options={users}
				placeholder="Who's the coolest cat?"
				onChange={(e) => {
					const message: Message = {
						...newMessage,
						recipient: e[0],
					} as Message
					setNewMessage(message)
				}}
				labelKey='name'
			/>

			<Form.Group className='mb-3' controlId='title'>
				<Form.Label>Title</Form.Label>
				<Form.Control
					type='text'
					placeholder='Title...'
					value={newMessage.title?.toString()}
					onChange={(e) => {
						const message: Message = {
							...newMessage,
							title: e.target.value,
						} as Message
						setNewMessage(message)
					}}
				/>
			</Form.Group>
			<Form.Group className='mb-3' controlId='body'>
				<Form.Label>Message body</Form.Label>
				<Form.Control
					as='textarea'
					rows={3}
					value={newMessage.body?.toString()}
					onChange={(e) => {
						const message: Message = {
							...newMessage,
							body: e.target.value,
						} as Message
						setNewMessage(message)
					}}
				/>
			</Form.Group>
			<Button variant='primary' type='submit' onClick={(e) => sendMessage(e)}>
				Submit
			</Button>
		</Form>
	)
}

export default SendMessageForm
