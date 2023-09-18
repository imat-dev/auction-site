import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import React, { useEffect, useState } from 'react';
import { authOptions } from './api/auth/[...nextauth]';
import Auction from './components/auction/auction';
import { auctionService } from '@/service/auctionService';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { auctionItemActions } from '@/store/auctionItemSlice';
import { RootState } from '@/store';
import Error from './components/ui/Error';
import { useRouter } from 'next/router';
import Loading from './components/ui/Loading';

const AuctionPage: React.FC = (props) => {
	const { data: session, status } = useSession();
	const dispatch = useDispatch();
	const [showError, setShowError] = useState<boolean>(false);
	const itemsState = useSelector(
		(state: RootState) => state.auctionItem.items
	);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const router = useRouter();

	useEffect(() => {
		const fetchItems = async () => {
			if (status === 'authenticated') {
				const token = (session!.user as any).token;
				try {
					const items = await auctionService.getAllAuctions(token);
					dispatch(auctionItemActions.fillItems({ items: items }));
					setShowError(false);
					setIsLoading(false);
				} catch (error: any) {
					setShowError(true);
				}
			}
		};

		const interval = setInterval(async () => {
			fetchItems();
			setIsLoading(false);
		}, 2000);

		return () => {
			clearInterval(interval);
		};
	}, [dispatch, status, isLoading, session]);

	if (showError) {
		return <Error />;
	}

	if (status === 'unauthenticated') {
		router.push('/');
		return <p>You are not allowed to view this page.</p>;
	}

	if (isLoading) {
		return <Loading />
	}

	return (
		<section className="container mx-auto">
			<h1 className="h2 mb-5">Public Auction</h1>
			<Auction items={itemsState} isLoading={isLoading} />
		</section>
	);
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
// 	const session = await getServerSession(
// 		context.req,
// 		context.res,
// 		authOptions
// 	);

// 	if (!session) {
// 		return {
// 			redirect: {
// 				destination: '/',
// 				permanent: false,
// 			},
// 		};
// 	}

// 	return {
// 		props: {},
// 	};
// };

export default AuctionPage;
