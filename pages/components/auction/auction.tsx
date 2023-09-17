import { Item } from '@/model/auction';
import React, { useState } from 'react';
import AuctionItem from './auctionItem';
import AuctionTableLayout from './auctionTableLayout';
import { useSession } from 'next-auth/react';

const Auction: React.FC<{ items: Item[], isLoading: boolean }> = (props) => {
	const [activeTab, setActiveTab] = useState<string>('ongoing');
	const { data: session, status } = useSession();

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
				<AuctionTableLayout>
					{props.isLoading && !publisedItem.length && <p>Loading records...</p>}
					{!publisedItem.length && !props.isLoading && <p>No records found.</p>}
					{publisedItem.map((item) => (
						<AuctionItem key={item.id} item={item} />
					))}
				</AuctionTableLayout>
			)}

			{activeTab === 'completed' && (
				<AuctionTableLayout>
					{props.isLoading && !completedItem.length && <p>Loading records...</p>}
					{!completedItem.length && !props.isLoading && <p>No records found.</p>}
					{completedItem.map((item) => (
						<AuctionItem key={item.id} item={item} />
					))}
				</AuctionTableLayout>
			)}
		</div>
	);
};

export default Auction;
