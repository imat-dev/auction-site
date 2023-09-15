import { Item } from '@/model/auction';
import React from 'react';

const AuctionItem: React.FC<{ item: Item }> = (props) => {

  return (
		<ul className="flex border-b border-gray-300 py-4">
			<li className="flex-1">{props.item.name}</li>
			<li className="flex-1">{props.item.startingPrice}</li>
			<li className="flex-1">{props.item.windowTime}</li>
			<li className="flex-1"><button className="btn-pill-orange">Bid Now</button></li>
		</ul>
	);
};

export default AuctionItem;
