import { Avatar, AvatarBadge, Box, Flex, HStack, Image, Input, Text, VStack } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { makeSelectChats, makeSelectUserId } from './selectors';
import backSvg from '../Assets/back.svg';
import sendSvg from '../Assets/send.png';
import avatarImg from '../Assets/Ellipse1.png';
import ChatBubble from './ChatBubble';
import { addMessage, seen } from './actions';
const chatStateSelector = createSelector(makeSelectChats, (chats) => ({
	chats,
}));
const userIdStateSelector = createSelector(makeSelectUserId, (userId) => ({
	userId,
}));
function Conversation({ currentConversation, setOpenConversation, socket }) {
	const { chats } = useSelector(chatStateSelector);
	const { userId } = useSelector(userIdStateSelector);
	const chat = chats.filter((ch) => ch.chatId === currentConversation)[0];
	const actionDispatch = (dispatch) => ({
		addMessages: (message) => dispatch(addMessage(message)),
	});
	const actionDispatchSeen = (dispatch) => ({
		seenAll: (message) => dispatch(seen(message)),
	});
	const { addMessages } = actionDispatch(useDispatch());
	const { seenAll } = actionDispatchSeen(useDispatch());
	useEffect(() => {
		seenAll(currentConversation);
	}, []);
	const handleSubmit = (e) => {
		e.preventDefault();
		const payload = {
			chatId: currentConversation,
			message: e.target.message.value,
			from: userId,
			messageId: uuidv4(),
			to: chat.id,
			seen: true,
		};
		socket.emit('send-message', { message: e.target.message.value, to: [chat.id] });
		addMessages(payload);
		console.log(e.target.message.value);
		e.target.message.value = '';
	};
	return (
		<Box pos='relative' h='100%'>
			<Box className='title' pt='2rem' ml='2.5rem' mb='0.75rem'>
				<Flex align='center'>
					<Box onClick={() => setOpenConversation(false)}>
						<Image src={backSvg} alt='back-svg' />
					</Box>
					<HStack ml='1.5rem' spacing='1rem' align='center'>
						<Avatar name='Dan Abrahmov' src={avatarImg}>
							<AvatarBadge boxSize='1em' bg='gray.500' />
						</Avatar>
						<Box>
							<Text
								fontSize='18px'
								lineHeight='18px'
								textTransform='capitalize'
								fontWeight='bold'
								opacity='0.9'
							>
								{chat.name.length > 19 ? `${chat.name.substr(0, 13)}...` : chat.name}
							</Text>
							<Text fontSize='13px' lineHeight='19px' opacity='0.5'>
								last seen 2 hours ago
							</Text>
						</Box>
					</HStack>
				</Flex>
			</Box>

			<VStack
				ml='2rem'
				mr='2rem'
				overflowY='scroll'
				h='40rem'
				css={{ '&::-webkit-scrollbar': { display: 'none' } }}
			>
				{chat &&
					chat.messages.map((messageDetails, i) => {
						return (
							<ChatBubble
								from={messageDetails.from === userId ? 'me' : 'diff'}
								message={messageDetails.message}
								key={i}
							/>
						);
					})}
				{/* <ChatBubble from='me' message='hi' />
				<ChatBubble from='diff' message='hello' time={new Date().toDateString()} />
				<ChatBubble from='me' message='hi' />
				<ChatBubble from='diff' message='hello' />
				<ChatBubble from='diff' message='hello' />
				<ChatBubble from='diff' message='hello' />
				<ChatBubble from='diff' message='hello' />
				<ChatBubble from='me' message='hi' />
				<ChatBubble from='diff' message='hello' time={new Date().toDateString()} />
				<ChatBubble from='me' message='hi' />
				<ChatBubble from='diff' message='🏆' />
				<ChatBubble from='diff' message='hello' />
				<ChatBubble from='diff' message='hello' />
				<ChatBubble from='diff' message='hello' />
				<ChatBubble from='diff' message='hello' /> */}
			</VStack>
			<Box pos='absolute' bottom='16px' left='16px' width='100%'>
				<form onSubmit={(e) => handleSubmit(e)}>
					<HStack spacing='1rem'>
						<Input
							name='message'
							pl='20px'
							placeholder='Aa'
							w='75%'
							borderRadius='100px'
							backgroundColor='#F3F3F3'
							variant='unstyled'
							css={{ '&': { height: '46px' } }}
						></Input>
						<button type='submit'>
							<img
								src={sendSvg}
								alt='voice-msg-svg'
								height='48px'
								width='48px'
								style={{ cursor: 'pointer' }}
							/>
						</button>
					</HStack>
				</form>
			</Box>
		</Box>
	);
}

export default Conversation;
