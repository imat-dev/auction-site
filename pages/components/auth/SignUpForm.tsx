import useInput from "@/hooks/useInput";
import User, { IUser } from "@/model/user";
import { isEmail, isNotEmpty, isValidPassword } from "@/util/validationSchema";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";

const SignUpForm = () => {
	const [formErrorMsg, setFormErrorMsg] = useState("");
	const showFormError = formErrorMsg !== "";
	const [isRegistering, setIsRegistering] = useState(false);
	const router = useRouter()

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
		enteredValue: enteredFirstName,
		isValid: firstNameIsValid,
		inputHasError: firstNameInputError,
		inputChangeHandler: firstNameChangeHandler,
		inputBlurHandler: firstNameBlurHandler,
	} = useInput((value) => {
		const validation = isNotEmpty.validate({value : value});
		if (validation.error) {
			return false;
		}
		return true;
	});

	const {
		enteredValue: enteredLastName,
		isValid: lastNameIsValid,
		inputHasError: lastNameInputError,
		inputChangeHandler: lastNameChangeHandler,
		inputBlurHandler: lastNameBlurHandler,
	} = useInput((value) => {
		const validation = isNotEmpty.validate({value : value});
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
		const validation = isValidPassword.validate({value : value});
		if (validation.error) {
			return false;
		}
		return true;
	});

	let formIsValid = false;
	if (
		emailIsValid &&
		firstNameIsValid &&
		lastNameIsValid &&
		passwordIsValid
	) {
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

		const newUser: IUser = {
			email: enteredEmail,
			password: enteredPassword,
			firstName: enteredFirstName,
			lastName: enteredLastName,
		};

		setIsRegistering(true);
		try {
			const result = await axios.post("/api/auth/signup", newUser);

			if(result) {
				
				await signIn("credentials", {
					redirect: false,
					email: enteredEmail,
					password: enteredPassword,
				});

				router.replace("/");
			}
		} catch (error: any) {
			setIsRegistering(false);
			setFormErrorMsg(error.response.data.message);
		}
		setIsRegistering(false);
	};

	return (
		<div className="h-full flex justify-center">
			<div className="w-full max-w-xs mt-20">
				<h1 className="text-blue-500 text-center font-bold text-4xl mb-5">
					Register
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
								emailInputError ? "border-red-500" : ""
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
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="username"
						>
							First Name
						</label>
						<input
							className={`${
								firstNameInputError ? "border-red-500" : ""
							} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
							id="first_name"
							type="text"
							value={enteredFirstName}
							onChange={firstNameChangeHandler}
							onBlur={firstNameBlurHandler}
							placeholder="First Name"
						/>
						{firstNameInputError && (
							<p className="text-red-500 text-xs italic mt-2">
								First name is a required field.
							</p>
						)}
					</div>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="lastname"
						>
							Last Name
						</label>
						<input
							className={`${
								lastNameInputError ? "border-red-500" : ""
							} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
							id="last_name"
							type="text"
							value={enteredLastName}
							onChange={lastNameChangeHandler}
							onBlur={lastNameBlurHandler}
							placeholder="Last Name"
						/>
						{lastNameInputError && (
							<p className="text-red-500 text-xs italic mt-2">
								Last name is a required field.
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
								passwordInputError ? "border-red-500" : ""
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
							className="bg-blue-500 disabled:cursor-not-allowed disabled:bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
							type="submit"
							disabled={!formIsValid}
						>
							{isRegistering ? "Loading..." : "Sign Up"}
						</button>

						<a
							className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
							href="#"
						>
							Forgot Password?
						</a>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SignUpForm;
