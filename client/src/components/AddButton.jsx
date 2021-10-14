import { v4 as uuidv4 } from 'uuid';
import {
	Box,
	Button,
	Image,
	Input,
	Popover,
	PopoverArrow,
	PopoverBody,
	PopoverCloseButton,
	PopoverContent,
	PopoverFooter,
	PopoverHeader,
	PopoverTrigger,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import AddIcon from '../Assets/Add.svg';
import { setUser } from './actions';
import { useDispatch } from 'react-redux';
function AddButton() {
	const [isPopOverOpen, setIsPopOverOpen] = useState(false);
	const openPopOver = () => setIsPopOverOpen(!isPopOverOpen);
	const closePopOver = () => setIsPopOverOpen(false);

	const actionDispatch = (dispatch) => ({
		setUsers: (user) => dispatch(setUser(user)),
	});
	const { setUsers } = actionDispatch(useDispatch());
	const addContact = (e) => {
		e.preventDefault();
		console.log(e.target.Id.value, e.target.name.value);
		const contactBody = { id: e.target.Id.value, chatId: uuidv4(), name: e.target.name.value, messages: [] };
		setUsers(contactBody);
		e.target.Id.value = '';
		e.target.name.value = '';
		closePopOver();
	};
	return (
		<Popover isOpen={isPopOverOpen} onClose={closePopOver} closeOnBlur={false} variant='none'>
			<PopoverTrigger>
				<Box onClick={openPopOver} pos='absolute' bottom='25px' right='25px' zIndex='1'>
					<Image src={AddIcon} alt='Add Icon' />
				</Box>
			</PopoverTrigger>
			<PopoverContent>
				<PopoverArrow />
				<PopoverCloseButton />
				<form onSubmit={(e) => addContact(e)}>
					<PopoverHeader>Id</PopoverHeader>
					<PopoverBody>
						<Input bg='#F3F3F3' placeholder='Id' name='Id' required />
					</PopoverBody>
					<PopoverHeader>Name</PopoverHeader>
					<PopoverBody>
						<Input bg='#F3F3F3' placeholder='Name' name='name' required />
					</PopoverBody>
					<PopoverFooter border='0' d='flex' alignItems='center' justifyContent='space-between' pb={4}>
						<Button type='submit' bg='gray.200'>
							Add Contacts
						</Button>
					</PopoverFooter>
				</form>
			</PopoverContent>
		</Popover>
	);
}

export default AddButton;
