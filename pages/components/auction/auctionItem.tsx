import { Item } from '@/model/auction';
import React, { useState } from 'react';
import PublishedButton from './publishedButton';
import { RootState } from '@/store';
import { uiActions } from '@/store/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import BidForm from '../forms/BidForm';
import Modal from '../ui/Modal';

const AuctionItem: React.FC<{ item: Item }> = (props) => {
	const [showModal, setShowModal] = useState<boolean>(false);

	const closeModalHandler = () => {
		setShowModal(false);
	};

	return (
		<ul className="flex border-b border-gray-300 py-4">
			<li className="flex-1">{props.item.name}</li>
			<li className="flex-1">${props.item.highestBid}</li>
			<li className="flex-1">{props.item.windowTime}hr(s)</li>
			<li className="flex-1">
				{props.item.status === 'draft' && (
					<PublishedButton id={props.item.id} />
				)}

				{props.item.status === 'published' && (
					<>
						<button
							className="btn-pill-orange"
							onClick={() => {
								setShowModal(true);
							}}
						>
							Bid Now
						</button>

						{showModal && (
							<Modal
								isOpen={showModal}
								onClose={() => setShowModal(false)}
							>
								<BidForm
									item={props.item}
									onCloseModal={closeModalHandler}
								/>
							</Modal>
						)}
					</>
				)}
			</li>
		</ul>
	);
};

export default AuctionItem;
