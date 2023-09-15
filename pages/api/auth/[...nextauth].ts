import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from 'next-auth/next';
import { NextAuthOptions, RequestInternal, User } from 'next-auth';
import { authService }  from '@/service/auth';

export const authOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			type: 'credentials',
			credentials: {},
			async authorize(
				credentials: any,
				req: Pick<
					RequestInternal,
					'body' | 'query' | 'headers' | 'method'
				>
			) {
				
				const user = await authService.login(
					credentials.email,
					credentials.password
				);

				return {
					id: credentials.email,
					email: credentials.email,
					name: credentials.email,
					token: user!.data.token,
				};
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			return { ...token, ...user };
		},
		async session({ session, token }) {
			return { ...session, user: token };
		},
	},
};

// export const authOptions  = {
// 	session: {
// 		jwt: true,
// 	},
// 	callbacks: {
// 		async jwt({ token, user }) {
// 			return { ...token, ...user };
// 		},
// 		async session({ session, token }) {
// 			return { ...session, user: token };
// 		},
// 	},
// 	providers: [
// 		CredentialsProvider({
// 			name: 'Credentials',
// 			authorize: async (credentials) => {

// 				const authService = new AuthService()

// 				try {
// 					const user = await axios.post('http://localhost:3000/api/auth/login', {
// 						email : credentials.email,
// 						password : credentials.password
// 					})

// 					return {
// 						email: credentials.email,
// 						// token: user.data.token
// 					};

// 				} catch (error) {
// 					throw new Error(error.response.data.message)
// 				}

// 			},
// 		}),
// 	],
// };
//call next auth here
export default NextAuth(authOptions);
