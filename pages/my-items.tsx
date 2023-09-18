import React from 'react';
import { Item } from '@/model/auction';
import MyAuction from './components/auction/myAuction';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Error from './components/ui/Error';
import { useState } from 'react';
import { useEffect } from 'react';
import { auctionService } from '@/service/auctionService';


const MyItemsPage: React.FC = (props) => {

	const { data: session, status } = useSession();
	const [showError, setShowError] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [myItems, setMyItems] = useState([])
	const router = useRouter();

	useEffect(() => {
		const fetchItems = async () => {
			if (status === 'authenticated') {
				const token = (session!.user as any).token;
				try {
					const items = await auctionService.getAllAuctions(token);
					setShowError(false);
					setMyItems(items)
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
	}, [myItems, status, isLoading, session]);

	if (showError) {
		return <Error />;
	}

	if (status === 'unauthenticated') {
		router.push('/');
		return(<p>You are not allowed to view this page.</p>)
	}

	return (
		<section className="container">
			<MyAuction items={myItems} />
		</section>
	);
};

export default  MyItemsPage;

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

// 	try {
// 		const token = (session.user as any).token;
// 		const { data } = await apiClient.get('auction/my-items', {
// 			headers: { Authorization: `Bearer ${token}` },
// 		});

// 		return {
// 			props: {
// 				items: data,
// 			},
// 		};
// 	} catch (error: any) {
// 		// console.log(error)
// 		const items: Item[] = [];
// 		return {
// 			props: {
// 				items: items,
// 				error: { message: error!.message },
// 			},
// 		};
// 	}
// };

