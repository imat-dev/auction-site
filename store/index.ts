import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
	reducer: { user: userReducer, ui: uiReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
