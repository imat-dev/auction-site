import apiClient from '@/util/axiosInstance';
import { handleError } from '@/util/axiosErrorHandler';

class BidService {
	public async placeBid(id: number, amount: string, token: string) {
		try {
			const { data } = await apiClient.post(
				`bid/${id}`,
				{
					bidAmount: amount,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			return data;
		} catch (error: any) {
			handleError(error);
		}
	}

	public async updateBid(id: number, amount: string, token: string) {
		try {
			const { data } = await apiClient.patch(
				`bid/${id}`,
				{
					bidAmount: amount,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			return data;
		} catch (error: any) {
			handleError(error);
		}
	}

	public async getCurrentBidOnItem(id: number, token: string) {
		try {
			const { data } = await apiClient.get(`bid/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			});

			return data;
		} catch (error: any) {
			handleError(error);
		}
	}
}

export const bidService = new BidService();
