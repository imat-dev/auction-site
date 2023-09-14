import axios from "axios";

export default class AuthService {
	private readonly url = "http://localhost:3000/api/auth/login";

	public async login(email: string, password: string) {
		const user = await axios.post(this.url, {
			email,
			password
		})

		console.log(user);

		return user;
	}
}