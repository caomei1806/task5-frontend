import React from 'react'
import './App.scss'
import Login from './components/Login'
import MessageList from './components/MessageList'
import SendMessageForm from './components/SendMessageForm'
import Stack from 'react-bootstrap/Stack'
import UserPanel from './components/UserPanel'
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom'

function App() {
	return (
		<Stack className='App p-5'>
			<Router>
				<Routes>
					<Route path='/' element={<Login />} />
					<Route path='/user-panel' element={<UserPanel />} />
				</Routes>
			</Router>
		</Stack>
	)
}

export default App
