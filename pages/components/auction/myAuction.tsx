import { Item } from '@/model/auction';
import React, { useState } from 'react';
import AuctionItem from './auctionItem';
import AuctionTableLayout from './auctionTableLayout';
import Link from 'next/link';

const MyAuction: React.FC<{ items: Item[] }> = (props) => {
	const [activeTab, setActiveTab] = useState<string>('draft');

	const draftItem = props.items.filter((item) => item.status === 'draft');

	const publisedItem =  props.items.filter(
		(item) => item.status === 'published'
	);

	const completedItem = props.items.filter(
		(item) => item.status === 'completed'
	);

	return (
		<div className="mb-[5rem]">
			<div className="flex">
				<ul className="flex gap-10 flex-wrap items-end">
					<li>
						<button
							className={`text-xl font-bold ${
								activeTab === 'draft'
									? 'btn-orange'
									: 'btn-brown'
							}`}
							onClick={() => setActiveTab('draft')}
						>
							Draft
						</button>
					</li>
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
					<li>
						<Link href="/auction" className='text-orange underline'>Go to Public Auction</Link>
					</li>
				</ul>
			</div>

			<hr className="h-px my-8 bg-orange border-0" />

			{activeTab === 'draft' && (
				<AuctionTableLayout>
					{draftItem.map((item) => (
						<AuctionItem key={item.id} item={item} />
					))}
				</AuctionTableLayout>
			)}

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

export default MyAuction;
