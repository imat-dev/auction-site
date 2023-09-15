import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Ui {
	showModal: boolean;
}

const initialState: Ui = {
	showModal: false,
};

const uiSlice = createSlice({
	name: 'ui',
	initialState: initialState,
	reducers: {
		toggleModal: (state) => {
			state.showModal = !state.showModal;
		},
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
