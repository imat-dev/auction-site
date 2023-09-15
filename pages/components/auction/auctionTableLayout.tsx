import React from 'react';

const AuctionTableLayout: React.FC<{ children: React.ReactNode }> = (props) => {
	return (
		<div className="">
			<div className="border border-orange rounded-lg overflow-hidden">
				<div className="bg-orange text-white p-4">
					<ul className="flex">
						<li className="flex-1 font-bold">Name</li>
						<li className="flex-1 font-bold">Current Price</li>
						<li className="flex-1 font-bold">Duration</li>
						<li className="flex-1 font-bold">Action</li>
					</ul>
				</div>
				<div className="p-4">
					{props.children}
				</div>
			</div>
		</div>
	);
};

export default AuctionTableLayout;
