import { User } from '@/model/auction';
import { AppDispatch, RootState } from '@/store';
import apiClient from '@/util/axiosInstance';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '@/store/userSlice';

const Balance = () => {
	const { data: session, status } = useSession();
	const dispatch = useDispatch();

	const user = useSelector((state: RootState) => state.user);

	useEffect(() => {
		const fetchUser = async () => {
			const token = (session?.user as any).token;

			const { data } = await apiClient.get('auth/profile', {
				headers: { Authorization: `Bearer ${token}` },
			});

			console.log(data);

			const user: User = data;

			dispatch(userActions.setBalance({ balance: user.balance, email : user.email }));
		};
		fetchUser();
	}, []);

	return (
		<button className="font-bold btn-pill text-lg">B: ${user.balance}</button>
	);
};

export default Balance;
