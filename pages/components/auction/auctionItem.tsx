import { Item } from '@/model/auction';
import React, { useState } from 'react';
import PublishedButton from './publishedButton';
import { RootState } from '@/store';
import { uiActions } from '@/store/uiSlice';
import { useDispatch, useSelector } from 'react-redux';
import BidForm from '../forms/BidForm';
import Modal from '../ui/Modal';
import Countdown from './countDown';

const AuctionItem: React.FC<{ item: Item }> = (props) => {
	const [showModal, setShowModal] = useState<boolean>(false);

	const closeModalHandler = () => {
		setShowModal(false);
	};

	// console.log(new Date().toLocaleString())
	// console.log(new Date(props.item.dateCreated).toLocaleString())
	console.log(props.item.dateCreated);
	let targetDate = new Date(props.item.dateCreated)
	targetDate.setHours(targetDate.getHours() +  props.item.windowTime);

	return (
		<ul className="flex border-b border-gray-300 py-4">
			<li className="flex-1">{props.item.name}</li>
			<li className="flex-1">${props.item.highestBid}</li>
			<li className="flex-1">
				{/* {props.item.windowTime}hr(s) */}
				
				<Countdown targetDate={targetDate.toISOString()} />
			</li>
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
