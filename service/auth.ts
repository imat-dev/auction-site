import apiClient from '@/util/axiosInstance';
import { handleError } from '@/util/axiosErrorHandler';
import axios from 'axios';

export default apiClient;

class AuthService {

	private readonly apiClient = axios.create({
		baseURL: "http://localhost:3000/api",
		timeout: 5000,
	  });
	
	public async login(email: string, password: string) {
		try {
			const user = await this.apiClient.post('/auth/login', {
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
			console.log(process.env.BACKEND_API_URL)
			console.log('here')
			const user = await this.apiClient.post('/users', {
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
