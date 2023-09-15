import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import React, { useEffect, useState } from 'react';
import { authOptions } from './api/auth/[...nextauth]';
import Auction from './components/auction/auction';
import apiClient from '@/util/axiosInstance';
import { Item } from '@/model/auction';
import { auctionService } from '@/service/auctionService';
import { useSession } from 'next-auth/react';

const AuctionPage: React.FC<{ items: Item[] }> = (props) => {
	const { data: session, status } = useSession();
	
	const [items, setItems] = useState<Item[]>(props.items)

	useEffect(() => {
		const interval = setInterval( async () => {
			if(status === 'authenticated') {
				const token = (session!.user as any).token;
				const items = await auctionService.getAllAuctions(token);
				setItems(items)
			}
		}, 5000);

		return () => clearInterval(interval);
	}, [status]);

	return (
		<section className="container mx-auto">
			<Auction items={items} />
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
