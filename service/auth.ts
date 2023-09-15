import apiClient from '@/util/axiosInstance';
import { handleError } from '@/util/axiosErrorHandler';


class AuthService {

	
	public async login(email: string, password: string) {
		try {
			const user = await apiClient.post('/auth/login', {
				email,
				password,
			});

			return user;
		} catch (error: any) {
			handleError(error);
		}
	}

	public async register(email: string, password: string) {
		try {
			
			const user = await apiClient.post('/users', {
				email,
				password,
			});

			return user;
		} catch (error) {
			handleError(error);
		}
	}
}

export const authService = new AuthService();
