import axios from 'axios'
import React, {
	useContext,
	useState,
	createContext,
	useEffect,
	useCallback,
} from 'react'
import { Message } from './models/Message'
import { User } from './models/User'
import { URL } from './setup'

interface AppContextInterface {
	user: String | undefined
	setUser: (User: String) => void
	users: String[]
	setUsers: (Users: String[]) => void
	messages: Message[]
	setMessages: (Messages: Message[]) => void
	trigger: Boolean
	setTrigger: (Trigger: Boolean) => void
}
const defaultMessage: Message = {
	_id: '',
	title: '',
	body: '',
	user: '',
}
const defaultAppContext: AppContextInterface = {
	user: '',
	setUser: (user) => console.warn(`no user provided: ${user}`),
	users: [],
	setUsers: (users) => console.warn(`no user provided: ${users}`),
	messages: [defaultMessage],
	setMessages: (messages) => console.warn(`no message provided: ${messages}`),
	trigger: false,
	setTrigger: (trigger) => console.warn(`triggered: ${trigger}`),
}

const AppContext = createContext<AppContextInterface>(defaultAppContext)
const AppProvider = ({ children }: React.PropsWithChildren<unknown>) => {
	const [user, setUser] = useState<String>()
	const [users, setUsers] = useState<String[]>([])
	const [messages, setMessages] = useState<Message[]>([])
	const [trigger, setTrigger] = useState<Boolean>(false)

	const getUsers = async () => {
		const res = await axios.get(`${URL}/user/users`)
		const data = await res
		const usernames = data.data.users.map((user: User) => user.name)
		setUsers(usernames)
	}
	const getMessages = async () => {
		const preMess = await axios.get(`${URL}/messages/${user}`, {
			withCredentials: true,
		})
		const mess = await preMess
		const d = mess.data.messages as Array<Message>
		const data = d.map((message) => {
			const newMessage: Message = {
				_id: message._id,
				user: message.user,
				title: message.title,
				body: message.body,
			}
			return newMessage
		})

		if (data.length > 0) {
			const newMessages: Message[] = [...data] as Message[]
			setMessages([...newMessages])
		}
	}
	useEffect(() => {
		const timeout = setInterval(() => {
			if (user) {
				getMessages()
				setTrigger(!trigger)
				console.log('i')
			}
		}, 3000)
		return () => clearInterval(timeout)
	}, [trigger, user])
	useEffect(() => {
		getUsers()
		console.log('user' + user)
		const timeout = setTimeout(() => {
			if (user) {
				getMessages()
				console.log('i')
			}
		}, 300)
		return () => clearTimeout(timeout)
	}, [user])
	return (
		<AppContext.Provider
			value={{
				user,
				setUser,
				users,
				setUsers,
				messages,
				setMessages,
				trigger,
				setTrigger,
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
