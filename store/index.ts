import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import uiReducer from './uiSlice';
import auctionItemReducer from './auctionItemSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		ui: uiReducer,
		auctionItem: auctionItemReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
