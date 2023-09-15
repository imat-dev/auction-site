import { getServerSession } from 'next-auth';
import LoginForm from './components/auth/LoginForm';
import { GetServerSideProps } from 'next';
import { authOptions } from './api/auth/[...nextauth]';

export default function Home() {
	return (
		<section className="container">
			<LoginForm />
		</section>
	);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

	if (session) {
		return {
			redirect: {
				destination: '/auction',
				permanent: false,
			},
		};
	}

	return {
		props: {
			session: session,
		},
	};

};
