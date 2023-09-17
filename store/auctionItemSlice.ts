import { Item } from '@/model/auction';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type InitialState = {
	items: Item[]
    isFirstFetched : boolean
};

const initialState: InitialState = {
	items: [],
    isFirstFetched: true
};

const auctionItemSlice = createSlice({
	name: 'auctionItem',
	initialState: initialState,
	reducers: {
		fillItems: (state, action: PayloadAction<{ items: Item[] }>) => {
			state.items = action.payload.items;
            state.isFirstFetched = false;
        },
        toggleIsFirstFetch(state) {
            state.isFirstFetched = !state.isFirstFetched
        }
	},
});

export const auctionItemActions = auctionItemSlice.actions;
export default auctionItemSlice.reducer;
