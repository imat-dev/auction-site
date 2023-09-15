import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const saveCartContent = (cart: any) => {
	return async (dispatch: any) => {
		// dispatch(actions.fetchDataRequest());

		localStorage.setItem('cart', JSON.stringify(cart));

		try {
			// const response = await fetch('https://api.example.com/data');
			// const data = await response.json();
			// dispatch(actions.fetchDataSuccess(data));
		} catch (error) {
			// dispatch(actions.fetchDataFailure('Failed to fetch data.'));
		}
	};
};
