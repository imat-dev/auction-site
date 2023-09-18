import React, { useState } from 'react';
import {
	DropdownMenu as Menu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './DropdownElements';
import { signOut } from 'next-auth/react';
import Modal from './Modal';
import DepositForm from '../forms/DepositForm';
import AddItemForm from '../forms/AddItemForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { uiActions } from '@/store/uiSlice';
import { useRouter } from 'next/router';

const DropdownMenu = () => {
	const [modalContent, setModalCotnent] = useState(<DepositForm />);
	const router = useRouter();
	const dispatch = useDispatch();
	const showModal = useSelector((state: RootState) => state.ui.showModal);
	const modalName = useSelector((state: RootState) => state.ui.modalName);

	const logoutHandler = () => {
		signOut({
			callbackUrl : '/'
		});
	};

	const depositModalHandler = () => {
		dispatch(uiActions.setModalToShow({ modalName: 'deposit' }));
		dispatch(uiActions.toggleModal());
	};
	const addItemModalHandler = () => {
		dispatch(uiActions.setModalToShow({ modalName: 'createItem' }));
		dispatch(uiActions.toggleModal());
	};

	return (
		<Menu>
			<DropdownMenuTrigger>
				<span className="btn-brown">Hello, User!</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={depositModalHandler}>
					Deposit
				</DropdownMenuItem>
				<DropdownMenuItem onClick={addItemModalHandler}>
					Create Item
				</DropdownMenuItem>
				<DropdownMenuItem
					onClick={() => {
						router.push('/my-items');
					}}
				>
					My Items
				</DropdownMenuItem>
				<DropdownMenuItem onClick={logoutHandler}>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>

			<Modal
				isOpen={showModal}
				onClose={() => dispatch(uiActions.toggleModal())}
			>
				{modalName === 'deposit' && <DepositForm />}
				{modalName === 'createItem' && <AddItemForm />}
			</Modal>
		</Menu>
	);
};

export default DropdownMenu;
