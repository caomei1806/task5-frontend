import axios from 'axios'
import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useGlobalContext } from '../context'
import { useNavigate } from 'react-router-dom'

const URL = 'http://localhost:5000/api/v1'

const Login = () => {
	const [username, setUsername] = useState<String>()
	const { setUser } = useGlobalContext()
	const navigate = useNavigate()
	const login = async (e: React.SyntheticEvent) => {
		e.preventDefault()
		const res = await axios.post(`${URL}/user/login`, {
			username,
		})
		const user = await res

		console.log(user.data.user)
		setUser(user.data.user._id)
		if (res.status === 200) {
			const timeout = setTimeout(() => {
				navigate('/user-panel')
				console.log('login')
			}, 200)
			return () => clearTimeout(timeout)
		}
	}
	return (
		<Form className='w-50'>
			<Form.Group className='mb-3' controlId='username'>
				<Form.Label>Username</Form.Label>
				<Form.Control
					type='text'
					placeholder='Enter username'
					onChange={(e) => {
						setUsername(e.target.value)
					}}
				/>
			</Form.Group>
			<Button
				variant='primary'
				type='submit'
				onClick={(e) => {
					login(e)
				}}
			>
				Submit
			</Button>
		</Form>
	)
}

export default Login
