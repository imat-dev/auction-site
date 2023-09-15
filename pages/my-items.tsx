import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import React from 'react';
import { authOptions } from './api/auth/[...nextauth]';
import Auction from './components/auction/auction';
import apiClient from '@/util/axiosInstance';
import { Item } from '@/model/auction';
import MyAuction from './components/auction/myAuction';

const MyItemsPage: React.FC<{ items: Item[] }> = (props) => {
  return (
    <section className='container'>
      <MyAuction items={props.items} />
    </section>
  )
}

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
		const { data } = await apiClient.get('auction/my-items', {
			headers: { Authorization: `Bearer ${token}` },
		});

		return {
			props: {
				items: data,
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

export default MyItemsPage