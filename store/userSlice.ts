import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface User {
	balance: number;
	email: string;
}

const initialState: User = {
	balance: 0,
	email: '',
};

const userSlice = createSlice({
	name: 'cart',
	initialState: initialState,
	reducers: {
		setUser: (state, action: PayloadAction<User>) => {
			state.balance = action.payload.balance;
			state.email = action.payload.email;
		},
		updateBalance: (state, action: PayloadAction<{ balance: number }>) => {
			state.balance = action.payload.balance;
		},
	},
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
