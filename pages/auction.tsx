import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions }  from './api/auth/[...nextauth]'
import { getSession } from 'next-auth/react';
import { getToken } from "next-auth/jwt"


const Auction = () => {
  return (
    <div>Auction</div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	//MAKE SURE YOU SET NEXTAUTH_SECRET your environment vars next.config.js
  const session = await getServerSession(context.req, context.res, authOptions);

	if (!session) {
		return {
			redirect: {
				destination: '/',
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

export default Auction