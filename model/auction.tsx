export interface User {
	id: number;
	email: string;
	balance: number;
}

export interface Item {
	id: number;
	name: string;
	startingPrice: number;
	windowTime: number;
	status: 'published' | 'draft' | 'completed';
	highestBid: number;
	refundJobId: string;
	isRefundJobCompleted: boolean;
	owner: User;
	highestBidder: User;
}