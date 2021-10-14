import React from 'react';
import { Box, Flex, Image, Text, VStack } from '@chakra-ui/react';
import SearchIcon from '../Assets/Search.svg';
import ChatList from './ChatList';
import { makeSelectChats, makeSelectUserId } from './selectors';
import { createSelector } from 'reselect';
import { useSelector } from 'react-redux';
const chatStateSelector = createSelector(makeSelectChats, (chats) => ({
	chats,
}));
const userIdStateSelector = createSelector(makeSelectUserId, (userId) => ({
	userId,
}));
function Chats({ setOpenConversation, setCurrentConversation }) {
	const { chats } = useSelector(chatStateSelector);
	const { userId } = useSelector(userIdStateSelector);
	return (
		<Box pos='relative'>
			<Flex
				alignItems='baseline'
				direction='row'
				justify='space-between'
				className='title'
				ml='2.25rem'
				mr='2.25rem'
				mb='2rem'
				pt='2rem'
			>
				<Text fontSize='36px' lineHeight='36px' textTransform='capitalize' color='#000000' opacity='0.9'>
					Chats
				</Text>
				<Image src={SearchIcon} alt='search-icon' />
			</Flex>
			<VStack
				css={{ '&::-webkit-scrollbar': { display: 'none' } }}
				spacing='2rem'
				ml='2.25rem'
				mr='2.25rem'
				overflowY='auto'
				h='80vh'
			>
				{chats.length &&
					chats.map((chat, index) => {
						// const unread = chat.messages.reduce(
						// 	(acc, messageDetails) => (messageDetails.seen ? acc++ : acc),
						// 	0
						// );
						const unread = chat.messages.reduce((acc, message) => (!message.seen ? (acc += 1) : acc), 0);
						return (
							<ChatList
								lastMsg={chat.messages[chat.messages.length - 1]?.message || ''}
								name={chat.name}
								chatId={chat.chatId}
								setOpenConversation={setOpenConversation}
								setCurrentConversation={setCurrentConversation}
								key={index}
								unread={unread}
							/>
						);
					})}
			</VStack>
		</Box>
	);
}

export default Chats;
