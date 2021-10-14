import React from 'react';
import { Box, Text, VStack } from '@chakra-ui/react';

function ChatBubble({ message, from, time }) {
	const isMe = from === 'me';
	const alignment = isMe ? 'flex-end' : 'flex-start';
	return (
		<VStack spacing='0' alignItems={alignment} alignSelf={alignment}>
			<Box p='20px' borderRadius='10px' backgroundColor='#F3F3F3' maxW='250px'>
				<Text fontSize='15px' lineHeight='22px' opacity='0.6'>
					{message}
				</Text>
			</Box>
			{time && (
				<Text fontSize='13px' lineHeight='19px' opacity='0.5'>
					{time}
				</Text>
			)}
		</VStack>
	);
}

export default ChatBubble;
