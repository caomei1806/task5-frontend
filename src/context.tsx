import axios from 'axios'
import React, { useContext, useState, createContext, useEffect } from 'react'
import { User } from './models/User'
const URL = 'http://localhost:5000/api/v1'

interface AppContextInterface {
	user: String | undefined
	setUser: (User: String) => void
	users: String[]
	setUsers: (Users: String[]) => void
}
const defaultAppContext: AppContextInterface = {
	user: '',
	setUser: (user) => console.warn(`no user provided: ${user}`),
	users: [],
	setUsers: (users) => console.warn(`no user provided: ${users}`),
}

const AppContext = createContext<AppContextInterface>(defaultAppContext)
const AppProvider = ({ children }: React.PropsWithChildren<unknown>) => {
	const [user, setUser] = useState<String>()
	const [users, setUsers] = useState<String[]>([])
	const getUsers = async () => {
		const res = await axios.get(`${URL}/user/users`)
		const data = await res
		const usernames = data.data.users.map((user: User) => user.name)
		setUsers(usernames)
	}
	useEffect(() => {
		getUsers()
	}, [user])
	return (
		<AppContext.Provider
			value={{
				user,
				setUser,
				users,
				setUsers,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export const useGlobalContext = () => {
	return useContext(AppContext)
}
export { AppContext, AppProvider }
