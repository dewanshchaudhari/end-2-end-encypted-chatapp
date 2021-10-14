import { v4 as uuidv4 } from 'uuid';
import { Box, Flex, Image } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Chats from './Chats';
import Conversation from './Conversation';
import { io } from 'socket.io-client';
import AddButton from './AddButton';
import { createSelector } from 'reselect';
import { makeSelectChats, makeSelectUserId } from './selectors';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage, setUser } from './actions';

const chatStateSelector = createSelector(makeSelectChats, (chats) => ({
	chats,
}));
const userIdStateSelector = createSelector(makeSelectUserId, (userId) => ({
	userId,
}));
function Screen() {
	const [openConversation, setOpenConversation] = useState(false);
	const [currentConversation, setCurrentConversation] = useState(null);
	const [socket, setSocket] = useState(null);
	const { chats } = useSelector(chatStateSelector);
	const { userId } = useSelector(userIdStateSelector);
	const actionDispatchSetUser = (dispatch) => ({
		setUsers: (user) => dispatch(setUser(user)),
	});
	const { setUsers } = actionDispatchSetUser(useDispatch());
	const actionDispatchAddMessage = (dispatch) => ({
		addMessages: (message) => dispatch(addMessage(message)),
	});
	const { addMessages } = actionDispatchAddMessage(useDispatch());
	useEffect(() => {
		console.log(userId);
		const newSocket = io('http://localhost:5000/', { query: { userId } });
		setSocket(newSocket);
		return () => newSocket.close();
	}, [userId]);
	useEffect(() => {
		if (!socket) return;
		socket.on('receive-message', ({ from, message }) => {
			console.log(from, message);
			const chat = chats.filter((ch) => ch.id === from)[0];
			console.log(chat);
			if (chat) {
				const payload = {
					chatId: chat.chatId,
					message,
					from,
					messageId: uuidv4(),
					to: userId,
					seen: openConversation && currentConversation === chat.chatId ? true : false,
				};
				addMessages(payload);
			} else {
				const chatId = uuidv4();
				const userPayload = {
					id: from,
					chatId,
					name: from,
					messages: [],
				};
				setUsers(userPayload);
				const payload = {
					chatId,
					message,
					from,
					messageId: uuidv4(),
					to: userId,
					seen: openConversation && currentConversation === chat.chatId ? true : false,
				};
				addMessages(payload);
			}
		});
		return () => socket.off('receive-message');
	});

	return (
		<Box w='375px' h='812px' bg='#FAFAFA' borderRadius='30px' pos='relative'>
			{openConversation && (
				<Conversation
					currentConversation={currentConversation}
					setOpenConversation={setOpenConversation}
					socket={socket}
				/>
			)}
			{!openConversation && (
				<>
					<Chats setOpenConversation={setOpenConversation} setCurrentConversation={setCurrentConversation} />
					<AddButton />
				</>
			)}
		</Box>
	);
}

export default Screen;
