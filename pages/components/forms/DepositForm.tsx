import useInput from '@/hooks/useInput';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { isValidDepositAmount } from '@/util/validationSchema';
import { depositService } from '@/service/depositService';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '@/store/userSlice';
import { RootState } from '@/store';
import { uiActions } from '@/store/uiSlice';

const DepositForm = () => {
	const [formErrorMsg, setFormErrorMsg] = useState<string | null>(null);
	const [showSuccess, setShowSuccess] = useState(false);
	const [isDepositing, setIsDepositing] = useState<boolean>(false);
	const { data: session, status } = useSession();
	const dispatch = useDispatch();

	const balance = useSelector( ( state : RootState) => state.user.balance )

	const showFormError = formErrorMsg !== '';

	const {
		enteredValue: enteredAmount,
		isValid: amountIsValid,
		inputHasError: amountInputError,
		inputChangeHandler: amountChangeHandler,
		inputBlurHandler: amountBlurHandler,
		resetInput : resetAmount
	} = useInput((value) => {
		const validation = isValidDepositAmount.validate({
			value: parseFloat(value),
		});
		if (validation.error) {
			return false;
		}
		return true;
	});

	let formIsValid = false;
	if (amountIsValid) {
		formIsValid = true;
	}

	const depositHandler = async (event: React.FormEvent) => {
		event.preventDefault();

		setFormErrorMsg('');
		setIsDepositing(true);

		try {
			const token = (session?.user as any).token;
			const result = await depositService.deposit(enteredAmount, token);

			if (result) {
				setShowSuccess(true);

				dispatch(
					userActions.updateBalance({ balance: result.balance })
				);

				// hide the success message after 5 seconds
				setTimeout(() => {
					setShowSuccess(false);
				}, 5000);

				resetAmount()
			}
		} catch (error: any) {
			setIsDepositing(false);
			setFormErrorMsg(error.message);
		}

		setIsDepositing(false);
	};

	return (
		<div className="w-full">
			<h1 className="text-left font-bold text-4xl mb-5">Deposit</h1>
			<form onSubmit={depositHandler} className="">
				{showFormError && (
					<p className="text-red-500 text-md italic mb-2">
						{formErrorMsg}
					</p>
				)}

				{showSuccess && <p className="text-green-500 text-md italic mb-2">
						Your new balance is : ${balance}
					</p>}

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
						placeholder="Amount to deposit"
					/>
					{amountInputError && (
						<p className="text-red-500 text-xs italic mt-2">
							Amount should be greater than 0.
						</p>
					)}
				</div>

				<div className="flex items-center justify-between">
					<button
						className="bg-orange disabled:cursor-not-allowed disabled:bg-gray-500 hover:bg-brown text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
						type="submit"
						disabled={!formIsValid}
					>
						{isDepositing ? 'Loading...' : 'Deposit'}
					</button>
					<button type="button" className='btn-yellow font-bold py-2 px-10 rounded' onClick={(()=>{ dispatch(uiActions.toggleModal()) })}>Cancel</button>
				</div>
			</form>
		</div>
	);
};

export default DepositForm;
