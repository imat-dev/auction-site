import useInput from '@/hooks/useInput';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { isValidDepositAmount } from '@/util/validationSchema';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { Bid, Item } from '@/model/auction';
import { bidService } from '@/service/bidService';
import { userActions } from '@/store/userSlice';

const BidForm: React.FC<{ item: Item; onCloseModal: any }> = (props) => {
	const [formErrorMsg, setFormErrorMsg] = useState<string | null>(null);
	const [showSuccess, setShowSuccess] = useState(false);
	const [isBidding, setIsBidding] = useState<boolean>(false);
	const [currentBid, setCurrentBid] = useState<Bid>();
	const dispatch = useDispatch();
	const { data: session, status } = useSession();
	const showFormError = formErrorMsg !== '';

	const {
		enteredValue: enteredAmount,
		isValid: amountIsValid,
		inputHasError: amountInputError,
		inputChangeHandler: amountChangeHandler,
		inputBlurHandler: amountBlurHandler,
		resetInput: resetAmount,
	} = useInput((value) => {
		const validation = isValidDepositAmount.validate({
			value: parseFloat(value),
		});
		if (validation.error) {
			return false;
		}
		if (parseFloat(value) <= props.item.highestBid) {
			return false;
		}
		return true;
	});

	let formIsValid = false;
	if (amountIsValid) {
		formIsValid = true;
	}

	const bidHandler = async (event: React.FormEvent) => {
		event.preventDefault();

		setFormErrorMsg('');
		setIsBidding(true);

		try {
			const token = (session?.user as any).token;

			let result;
			if (currentBid) {
				result = await bidService.updateBid(
					props.item.id,
					enteredAmount,
					token
				);
			} else {
				result = await bidService.placeBid(
					props.item.id,
					enteredAmount,
					token
				);
			}

			if (result) {
				setShowSuccess(true);

				dispatch(
					userActions.updateBalance({
						balance: result.updatedBalance,
					})
				);

				setTimeout(() => {
					setShowSuccess(false);
				}, 5000);

				resetAmount();
			}
		} catch (error: any) {
			setIsBidding(false);
			setFormErrorMsg(error.message);
		}

		setIsBidding(false);
	};

	useEffect(() => {
		const fetchCurrentBid = async () => {
			const token = (session?.user as any).token;
			try {
				const currentBid = await bidService.getCurrentBidOnItem(
					props.item.id,
					token
				);
				setCurrentBid(currentBid);
			} catch (error: any) {}
		};

		fetchCurrentBid();
	}, [currentBid, props.item.id]);

	return (
		<div className="w-full">
			<h1 className="text-left font-bold text-4xl mb-5">
				{props.item.name} (${props.item.highestBid})
			</h1>
			{currentBid && (
				<h2 className="text-left font-bold text-2xl mb-5">
					Your Bid: ${currentBid.bidAmount}
				</h2>
			)}

			<form onSubmit={bidHandler} className="">
				{showFormError && (
					<p className="text-red-500 text-md italic mb-2">
						{formErrorMsg}
					</p>
				)}

				{showSuccess && (
					<p className="text-green-500 text-md italic mb-2">
						Updated Succesfully.
					</p>
				)}

				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="username"
					>
						Amount
					</label>
					<input
						className={`${
							amountInputError ? 'border-red-500' : ''
						} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
						id="amount"
						type="number"
						value={enteredAmount}
						onChange={amountChangeHandler}
						onBlur={amountBlurHandler}
						placeholder="Amount to bid"
					/>
					{amountInputError && (
						<p className="text-red-500 text-xs italic mt-2">
							Amount should be higher than the highest bid.
						</p>
					)}
				</div>

				<div className="flex items-center justify-between">
					<button
						className="bg-orange disabled:cursor-not-allowed disabled:bg-gray-500 hover:bg-brown text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
						type="submit"
						disabled={!formIsValid}
					>
						{isBidding ? 'Loading...' : 'Bid'}
					</button>

					<button
						type="button"
						className="btn-yellow font-bold py-2 px-10 rounded"
						onClick={() => {
							props.onCloseModal();
						}}
					>
						Cancel
					</button>
				</div>
			</form>
		</div>
	);
};

export default BidForm;
