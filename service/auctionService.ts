import apiClient from '@/util/axiosInstance';
import { handleError } from '@/util/axiosErrorHandler';


class AuctionService {  
    //do not fetch drafted
    public async getAllAuctions(token: string) {
        try {
            const { data } = await apiClient.get('auction', {
                headers: { Authorization: `Bearer ${token}` },
            });

            return data;
        } catch (error) {
            handleError(error)
        }
    }
}

export const auctionService = new AuctionService();
