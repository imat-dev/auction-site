import React, { useState } from 'react';
import {
	DropdownMenu as Menu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import Modal from './Modal';
import DepositForm from '../forms/DepositForm';

const DropdownMenu = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const logoutHandler = () => {
		signOut();
	};

	return (
		<Menu>
			<DropdownMenuTrigger>
				<span className="btn-brown">Hello, User!</span>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>My Account</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuItem>Create Item</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setIsModalOpen(true)}>
					Deposit
				</DropdownMenuItem>
				<DropdownMenuItem onClick={logoutHandler}>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				<DepositForm />
			</Modal>
		</Menu>
	);
};

export default DropdownMenu;
