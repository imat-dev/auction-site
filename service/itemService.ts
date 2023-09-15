import apiClient from '@/util/axiosInstance';
import { handleError } from '@/util/axiosErrorHandler';
import { Item } from '@/model/auction';

interface DraftItem {
	name: string;
	startingPrice: string;
	windowTime: number;
}

class ItemService {
	public async draftItem(item: DraftItem, token: string) {
		try {
			const { data } = await apiClient.post(
				'auction',
				{
					name: item.name,
					startingPrice: item.startingPrice,
					windowTime: item.windowTime,
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

	public async publishItem(id: number, token: string) {
		try {
			const { data } = await apiClient.patch(
				`auction/${id}`,
				{
					status: 'published',
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
}

export const itemService = new ItemService();
