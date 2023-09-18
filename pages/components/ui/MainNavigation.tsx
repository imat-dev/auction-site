import React, {  useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import DropdownMenu from './DropdownMenu';
import Balance from '../user/Balance';

const MainNavigation = () => {
	const session = useSession();

	return (
		<>
			<motion.header className="bg-yellow  w-full top-0  rounded-br-[3.125rem] z-10">
				<div className="container">
					<div className="flex justify-between items-center md:py-[1.19rem] md:px-[1.87rem] py-[1rem]">
						<Link href="/" className="text-brown">
							<h1 className="md:text-2xl text-[1rem] font-bold">AUCTION</h1>
						</Link>
						{session.status === 'authenticated' && (
							<motion.div className="flex items-center gap-2 cursor-pointer">
								<Balance />
								<DropdownMenu />
							</motion.div>
						)}
					</div>
				</div>
			</motion.header>
		</>
	);
};

export default MainNavigation;
