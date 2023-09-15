import { Item } from '@/model/auction';
import React, { useState } from 'react';
import AuctionItem from './auctionItem';
import AuctionTableLayout from './auctionTableLayout';

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
				<AuctionTableLayout>
					{publisedItem.map((item) => (
						<AuctionItem key={item.id} item={item} />
					))}
				</AuctionTableLayout>
			)}

			{activeTab === 'completed' && (
				<AuctionTableLayout>
					{completedItem.map((item) => (
						<AuctionItem key={item.id} item={item} />
					))}
				</AuctionTableLayout>
			)}
		</div>
	);
};

export default Auction;
