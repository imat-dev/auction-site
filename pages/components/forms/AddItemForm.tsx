import useInput from '@/hooks/useInput';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import {
	isNotEmpty,
	isValidDepositAmount,
	isValidWindowTime,
} from '@/util/validationSchema';
import { useDispatch } from 'react-redux';
import { itemService } from '@/service/itemService';
import Link from 'next/link';
import { uiActions } from '@/store/uiSlice';
import { useRouter } from 'next/router';

const AddItemForm = () => {
	const [formErrorMsg, setFormErrorMsg] = useState<string | null>(null);
	const [showSuccess, setShowSuccess] = useState(false);
	const [isDepositing, setIsDepositing] = useState<boolean>(false);
	const { data: session, status } = useSession();
	const dispatch = useDispatch()
	const showFormError = formErrorMsg !== '';
	const router = useRouter()

	const {
		enteredValue: enteredStartingPrice,
		isValid: startingPriceIsValid,
		inputHasError: startingPriceInputError,
		inputChangeHandler: startingPriceChangeHandler,
		inputBlurHandler: startingPriceBlurHandler,
		resetInput: resetStartingPrice,
	} = useInput((value) => {
		const validation = isValidDepositAmount.validate({
			value: parseFloat(value),
		});
		if (validation.error) {
			return false;
		}
		return true;
	});

	const {
		enteredValue: enteredName,
		isValid: nameIsValid,
		inputHasError: nameInputError,
		inputChangeHandler: nameChangeHandler,
		inputBlurHandler: nameBlurHandler,
		resetInput: resetName,
	} = useInput((value) => {
		const validation = isNotEmpty.validate({
			value: value,
		});
		if (validation.error) {
			return false;
		}
		return true;
	});

	const {
		enteredValue: enteredTime,
		isValid: timeIsValid,
		inputHasError: timeInputError,
		inputChangeHandler: timeChangeHandler,
		inputBlurHandler: timeBlurHandler,
		resetInput: resetTime,
	} = useInput((value) => {
		const validation = isValidWindowTime.validate({
			value: value,
		});
		if (validation.error) {
			return false;
		}
		return true;
	});

	let formIsValid = false;
	if (startingPriceIsValid && nameIsValid && timeIsValid) {
		formIsValid = true;
	}

	const depositHandler = async (event: React.FormEvent) => {
		event.preventDefault();

		setFormErrorMsg('');
		setIsDepositing(true);

		try {
			const token = (session?.user as any).token;
			const result = await itemService.draftItem(
				{
					name: enteredName,
					windowTime: parseFloat(enteredTime),
					startingPrice: enteredStartingPrice,
				},
				token
			);

			if (result) {
				setShowSuccess(true);

				// hide the success message after 5 seconds
				setTimeout(() => {
					setShowSuccess(false);
				}, 5000);

				resetStartingPrice();
				resetName();
				resetTime()
			}
		} catch (error: any) {
			setIsDepositing(false);
			setFormErrorMsg(error.message);
		}

		setIsDepositing(false);
	};

	const viewItemsHandler = () => {
		router.push('/my-items');
		dispatch(uiActions.toggleModal())
	}

	return (
		<div className="w-full">
			<h1 className="text-left font-bold text-4xl mb-5">Add Item</h1>
			<form onSubmit={depositHandler} className="">
				{showFormError && (
					<p className="text-red-500 text-md italic mb-2">
						{formErrorMsg}
					</p>
				)}

				{showSuccess && (
					<div className='flex gap-5'>
						<p className="text-green-500 text-md italic mb-2">
							Success adding new item.
						</p>
						<button
							onClick={viewItemsHandler}
							className="text-green-500 italic underline"
						>
							View Your Items.
						</button>
					</div>
				)}

				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="username"
					>
						Item Name
					</label>
					<input
						className={`${
							nameInputError ? 'border-red-500' : ''
						} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
						id="name"
						type="text"
						value={enteredName}
						onChange={nameChangeHandler}
						onBlur={nameBlurHandler}
						placeholder="Item Name"
					/>
					{nameInputError && (
						<p className="text-red-500 text-xs italic mt-2">
							Invalid Item Name.
						</p>
					)}
				</div>

				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="username"
					>
						Starting Price
					</label>
					<input
						className={`${
							startingPriceInputError ? 'border-red-500' : ''
						} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
						id="startingPrice"
						type="number"
						value={enteredStartingPrice}
						onChange={startingPriceChangeHandler}
						onBlur={startingPriceBlurHandler}
						placeholder="Starting Price"
					/>
					{startingPriceInputError && (
						<p className="text-red-500 text-xs italic mt-2">
							Starting Price should be greather than 0.
						</p>
					)}
				</div>

				<div className="mb-4">
					<label
						className="block text-gray-700 text-sm font-bold mb-2"
						htmlFor="username"
					>
						Window Time
					</label>
					<input
						className={`${
							timeInputError ? 'border-red-500' : ''
						} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
						id="windowTime"
						type="number"
						value={enteredTime}
						onChange={timeChangeHandler}
						onBlur={timeBlurHandler}
						placeholder="Window Time"
					/>
					{timeInputError && (
						<p className="text-red-500 text-xs italic mt-2">
							Minimum window time is 1 hour.
						</p>
					)}
				</div>

				<div className="flex items-center justify-between">
					<button
						className="bg-orange disabled:cursor-not-allowed disabled:bg-gray-500 hover:bg-brown text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
						type="submit"
						disabled={!formIsValid}
					>
						{isDepositing ? 'Loading...' : 'Draft Item'}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddItemForm;
