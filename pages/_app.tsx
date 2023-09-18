import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from './components/ui/MainLayout';
import { SessionProvider } from 'next-auth/react';
import { Provider } from 'react-redux';
import { store } from '@/store';
import Head from 'next/head';
import ErrorBoundery from './components/error/errorBoundery';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<Provider store={store}>
				<Head>
					<title>Simple Auction</title>
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta name="description" content="A simple auction site." />
				</Head>
				<ErrorBoundery fallback={<p>Something went wrong!</p>}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ErrorBoundery>
			</Provider>
		</SessionProvider>
	);
}
