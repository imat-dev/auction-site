import useInput from '@/hooks/useInput';
import { authService } from '@/service/authService';
import { isEmail, isValidPassword } from '@/util/validationSchema';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

const SignUpForm = () => {
	const [formErrorMsg, setFormErrorMsg] = useState('');
	const showFormError = formErrorMsg !== '';
	const [isRegistering, setIsRegistering] = useState(false);
	const router = useRouter();

	const {
		enteredValue: enteredEmail,
		isValid: emailIsValid,
		inputHasError: emailInputError,
		inputChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
	} = useInput((value) => {
		const validation = isEmail.validate({ value: value });
		if (validation.error) {
			return false;
		}
		return true;
	});

	const {
		enteredValue: enteredPassword,
		isValid: passwordIsValid,
		inputHasError: passwordInputError,
		inputChangeHandler: passwordChangeHandler,
		inputBlurHandler: passwordBlurHandler,
	} = useInput((value) => {
		const validation = isValidPassword.validate({ value: value });
		if (validation.error) {
			return false;
		}
		return true;
	});

	let formIsValid = false;
	if (emailIsValid && passwordIsValid) {
		formIsValid = true;
	}

	const submitFormHandler = async (event: React.FormEvent) => {
		event.preventDefault();

		if (!formIsValid) {
			return;
		}

		if (isRegistering) {
			return;
		}

		setIsRegistering(true);
		try {
			const user = await authService.register(
				enteredEmail,
				enteredPassword
			);

			if (user) {
				await signIn('credentials', {
					redirect: false,
					email: enteredEmail,
					password: enteredPassword,
				});

				router.replace('/auction');
			}
		} catch (error: any) {
			setIsRegistering(false);
			setFormErrorMsg(error.message);
		}

		setIsRegistering(false);
	};

	return (
		<div className="h-full flex justify-center">
			<div className="w-full max-w-md">
				<h1 className="text-brown text-center font-bold text-4xl mb-5">
					Sign Up
				</h1>
				<form
					onSubmit={submitFormHandler}
					className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
				>
					{showFormError && (
						<p className="text-red-500 text-md italic mb-2">
							{formErrorMsg}
						</p>
					)}

					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="username"
						>
							Email
						</label>
						<input
							className={`${
								emailInputError ? 'border-red-500' : ''
							} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
							id="email"
							type="email"
							value={enteredEmail}
							onChange={emailChangeHandler}
							onBlur={emailBlurHandler}
							placeholder="Email address"
						/>
						{emailInputError && (
							<p className="text-red-500 text-xs italic mt-2">
								Invalid email address.
							</p>
						)}
					</div>

					<div className="mb-6">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							Password
						</label>
						<input
							className={`${
								passwordInputError ? 'border-red-500' : ''
							} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
							id="password"
							type="password"
							value={enteredPassword}
							onChange={passwordChangeHandler}
							onBlur={passwordBlurHandler}
							placeholder="******************"
						/>
						{passwordInputError && (
							<p className="text-red-500 text-xs italic mt-2">
								Password should be 6 chars long and must contain
								special chars
							</p>
						)}
					</div>
					<div className="flex items-center justify-between">
						<button
							className="bg-yellow disabled:cursor-not-allowed disabled:bg-gray-500 hover:bg-orange text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
							type="submit"
							disabled={!formIsValid}
						>
							{isRegistering ? 'Loading...' : 'Sign Up'}
						</button>

						<Link
							href="/"
							className="inline-block align-baseline font-bold text-sm text-orange hover:text-orange-800"
						>
							Back to Sign In
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUpForm;
