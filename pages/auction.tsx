import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import React, { useEffect, useState } from 'react';
import { authOptions } from './api/auth/[...nextauth]';
import Auction from './components/auction/auction';
import { Item } from '@/model/auction';
import { auctionService } from '@/service/auctionService';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { auctionItemActions } from '@/store/auctionItemSlice';
import { RootState } from '@/store';
import Error from './components/ui/Error';

const AuctionPage: React.FC<{ items: Item[] }> = (props) => {
	const { data: session, status } = useSession();
	const dispatch = useDispatch();
	const [showError, setShowError] = useState<boolean>(false);
	const itemsState = useSelector(
		(state: RootState) => state.auctionItem.items
	);

	useEffect(() => {
		const interval = setInterval(async () => {
			if (status === 'authenticated') {
				const token = (session!.user as any).token;
				try {
					const items = await auctionService.getAllAuctions(token);
					dispatch(auctionItemActions.fillItems({ items: items }));
					setShowError(false);
				} catch (error: any) {
					setShowError(true);
				}
			}
		}, 2000);

		return () => {
			clearInterval(interval);
		};
	}, [status, dispatch]);

	if(showError) {
		return (<Error />)
	}

	return (
		<section className="container mx-auto" suppressHydrationWarning>
			{/* do this to avoid hydration error */}
			{itemsState.length === 0 && <Auction items={props.items} />}
			{itemsState.length > 1 && <Auction items={itemsState} />}
		</section>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const session = await getServerSession(
		context.req,
		context.res,
		authOptions
	);

	if (!session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	try {
		const token = (session.user as any).token;
		const items = await auctionService.getAllAuctions(token);

		return {
			props: {
				items: items,
			},
		};
	} catch (error: any) {
		// console.log(error)
		const items: Item[] = [];
		return {
			props: {
				items: items,
				error: { message: error!.message },
			},
		};
	}
};

export default AuctionPage;
