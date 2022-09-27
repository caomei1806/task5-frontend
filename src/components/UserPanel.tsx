import { Stack } from 'react-bootstrap'
import MessageList from './MessageList'
import SendMessageForm from './SendMessageForm'

const UserPanel = () => {
	return (
		<Stack gap={3}>
			<SendMessageForm />
			<MessageList />
		</Stack>
	)
}

export default UserPanel
