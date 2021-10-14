import { createStore, combineReducers } from 'redux';
import chatPage from './components/reducers';
const saveToLocalStorage = (state) => {
	try {
		const serialisedState = JSON.stringify(state);
		localStorage.setItem('store', serialisedState);
	} catch (e) {
		console.warn(e);
	}
};
const loadFromLocalStorage = () => {
	try {
		const serialisedState = localStorage.getItem('store');
		if (serialisedState === null) return undefined;
		return JSON.parse(serialisedState);
	} catch (e) {
		console.warn(e);
		return undefined;
	}
};
const reducers = combineReducers({ chatPage });
const store = createStore(
	reducers,
	loadFromLocalStorage(),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
store.subscribe(() => saveToLocalStorage(store.getState()));
export default store;
