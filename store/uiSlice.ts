import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface Ui {
	showModal: boolean;
	modalName: string;
}

const initialState: Ui = {
	showModal: false,
	modalName: 'deposit',
};

const uiSlice = createSlice({
	name: 'ui',
	initialState: initialState,
	reducers: {
		toggleModal: (state) => {
			state.showModal = !state.showModal;
		},
		setModalToShow: (
			state,
			action: PayloadAction<{ modalName: string }>
		) => {
			state.modalName = action.payload.modalName;
		},
	},
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
