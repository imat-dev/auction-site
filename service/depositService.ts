import apiClient from '@/util/axiosInstance';
import { handleError } from '@/util/axiosErrorHandler';

class DepositService {
	public async deposit(amount: string, token: string) {
		try {
			const { data } = await apiClient.post(
				'deposits',
				{
					amount: amount,
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

export const depositService = new DepositService();
