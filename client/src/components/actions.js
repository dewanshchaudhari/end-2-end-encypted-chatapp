export const setUser = (users) => ({ type: 'setUser', payload: users });
export const addMessage = (message) => ({ type: 'addMessage', payload: message });
export const seen = (chatId) => ({ type: 'seen', payload: chatId });
