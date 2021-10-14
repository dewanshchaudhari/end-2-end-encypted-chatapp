import { v4 as uuidv4 } from 'uuid';
const defaultState = {
	userId: uuidv4(),
	chats: [],
};
export default function chatReducer(state = defaultState, action) {
	switch (action.type) {
		case 'setUser':
			const presentChat = state.chats.findIndex((chat) => chat.id === action.payload.id);
			console.log(presentChat);
			if (presentChat >= 0) {
				const newChat = [...state.chats];
				console.log(newChat[presentChat]);
				newChat[presentChat].name = action.payload.name;
				return {
					...state,
					chats: newChat,
				};
			} else return { ...state, chats: [...state.chats, action.payload] };
		case 'addMessage':
			console.log(action.payload);
			const index = state.chats.findIndex((chat) => chat.chatId === action.payload.chatId);
			console.log(index);
			const newChat = [...state.chats];
			newChat[index].messages.push({
				chatId: action.payload.chatId,
				from: action.payload.from,
				messageId: action.payload.messageId,
				message: action.payload.message,
				seen: action.payload.seen,
			});
			return {
				...state,
				chats: newChat,
			};
		case 'seen': {
			const chatIndex = state.chats.findIndex((chat) => chat.chatId === action.payload);
			const newChat = [...state.chats];
			newChat[chatIndex].messages.forEach((messageDetails) => (messageDetails.seen = true));
			return {
				...state,
				chats: newChat,
			};
		}
		default:
			return state;
	}
}
