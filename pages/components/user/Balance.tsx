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

			try {

				const { data } = await apiClient.get('auth/profile', {
					headers: { Authorization: `Bearer ${token}` },
				});
				const user: User = data;

				dispatch(userActions.setUser({ balance: user.balance, email : user.email }));
			} catch (e) {
				console.log(e)
			}

		};
		fetchUser();
	}, []);

	return (
		<button className="font-bold btn-pill md:text-lg text-sm">B: ${user.balance}</button>
	);
};

export default Balance;
