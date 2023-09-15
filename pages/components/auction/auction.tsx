import { Item } from '@/model/auction';
import apiClient from '@/util/axiosInstance';
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import AuctionItem from './auctionItem';

const Auction: React.FC<{ items: Item[] }> = (props) => {
	const [activeTab, setActiveTab] = useState<string>('ongoing');

	const publisedItem = props.items.filter(
		(item) => item.status === 'published'
	);
	const completedItem = props.items.filter(
		(item) => item.status === 'completed'
	);

	return (
		<div className="mb-[5rem]">
			<div className="flex">
				<ul className="flex gap-10">
					<li>
						<button
							className={`text-xl font-bold ${
								activeTab === 'ongoing'
									? 'btn-orange'
									: 'btn-brown'
							}`}
							onClick={() => setActiveTab('ongoing')}
						>
							Ongoing
						</button>
					</li>
					<li>
						<button
							className={`text-xl font-bold ${
								activeTab === 'completed'
									? 'btn-orange'
									: 'btn-brown'
							}`}
							onClick={() => setActiveTab('completed')}
						>
							Completed
						</button>
					</li>
				</ul>
			</div>

			<hr className="h-px my-8 bg-orange border-0" />

			{activeTab === 'ongoing' && (
				<div className="">
					<div className="border border-orange rounded-lg overflow-hidden">
						<div className="bg-orange text-white p-4">
							<ul className="flex">
								<li className="flex-1 font-bold">Name</li>
								<li className="flex-1 font-bold">
									Current Price
								</li>
								<li className="flex-1 font-bold">Duration</li>
								<li className="flex-1 font-bold">Bid</li>
							</ul>
						</div>
						<div className="p-4">
							{publisedItem.map((item) => (
								<AuctionItem key={item.id} item={item} />
							))}
						</div>
					</div>
				</div>
			)}

			{activeTab === 'completed' && (
				<div className="">
					<div className="border border-orange rounded-lg overflow-hidden">
						<div className="bg-orange  text-white p-4">
							<ul className="flex">
								<li className="flex-1 font-bold">Name</li>
								<li className="flex-1 font-bold">
									Highest Bid
								</li>
								<li className="flex-1 font-bold">Duration</li>
								<li className="flex-1 font-bold">Bid</li>
							</ul>
						</div>
						<div className="p-4">
							{completedItem.map((item) => (
								<AuctionItem key={item.id} item={item} />
							))}
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Auction;
