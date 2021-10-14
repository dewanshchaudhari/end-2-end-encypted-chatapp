import { createSelector } from 'reselect';
const chatPageState = (state) => state.chatPage;
export const makeSelectChats = createSelector(chatPageState, (chatPage) => chatPage.chats);
export const makeSelectUserId = createSelector(chatPageState, (chatPage) => chatPage.userId);
