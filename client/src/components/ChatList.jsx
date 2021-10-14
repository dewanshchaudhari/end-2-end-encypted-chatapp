import React from 'react';
import { Box, Flex, HStack, Image, Text } from '@chakra-ui/react';
import AvatarImage from '../Assets/Ellipse1.png';
import numberSvg from '../Assets/number.svg';
import { Avatar, AvatarBadge } from '@chakra-ui/react';
function ChatList({ name, setOpenConversation, setCurrentConversation, chatId, lastMsg, unread }) {
	const handleClick = () => {
		setCurrentConversation(chatId);
		setOpenConversation(true);
	};
	return (
		<Flex align='center' justify='space-between' w='100%'>
			<Flex justify='space-evenly'>
				<Avatar name='temp' src={AvatarImage}>
					<AvatarBadge boxSize='1em' bg='gray.500' />
				</Avatar>
				<Box ml='0.5rem' onClick={() => handleClick()}>
					<h3>{name.length > 19 ? `${name.substr(0, 16)}...` : name}</h3>
					<Text fontSize='15px' lineHeight='22px' opacity='0.5'>
						{lastMsg}
					</Text>
				</Box>
			</Flex>
			<Flex direction='column' onClick={() => handleClick()} alignItems='flex-end'>
				<Text opacity='0.4' fontSize='13px' lineHeight='19px' textAlign='right'>
					18:21
				</Text>
				{unread > 0 && (
					<Box pos='relative'>
						<Text
							pos='absolute'
							left='34%'
							top='10%'
							fontWeight='bold'
							color='#ffffff'
							fontSize='12px'
							lineHeight='15px'
						>
							{unread}
						</Text>
						<Image src={numberSvg} alt='number-svg' h='20px' w='20px' />
					</Box>
				)}
			</Flex>
		</Flex>
	);
}

export default ChatList;
