import { useState } from "react";
import { signIn } from "next-auth/react";

const SocialLogin = () => {
	const [formErrorMsg, setFormErrorMsg] = useState("");
	const showFormError = formErrorMsg !== "";

	const loginByGoogleHandler = async () => {
		try {
			const result = await signIn("google");
		} catch (e: any) {
			setFormErrorMsg(e.message);
		}
	};

    const loginByLinkedin = async () => {
		try {
			const result = await signIn("linkedin");
		} catch (e: any) {
			setFormErrorMsg(e.message);
		}
	};

	return (
		<div className="mt-5">
			{showFormError && (
				<p className="text-red-500 text-md italic mb-2">
					Something went wrong!
				</p>
			)}
			<div className="px-6 sm:px-0 max-w-sm">
				<button
					onClick={loginByGoogleHandler}
					type="button"
					className="text-white w-full  bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
				>
					<svg
						className="mr-2 -ml-1 w-4 h-4"
						aria-hidden="true"
						focusable="false"
						data-prefix="fab"
						data-icon="google"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 488 512"
					>
						<path
							fill="currentColor"
							d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
						></path>
					</svg>
					Sign up with Google<div></div>
				</button>
			</div>
			<div className="px-6 sm:px-0 max-w-sm">
				<button
					onClick={loginByLinkedin}
					type="button"
					className="text-white w-full  bg-[#003f66] hover:bg-[#003f66]/90 focus:ring-4 focus:outline-none focus:ring-[#003f66]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5"
						fill="currentColor"
						viewBox="0 0 24 24"
					>
						<path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
					</svg>
					Sign up with Linkedin<div></div>
				</button>
			</div>
		</div>
	);
};

export default SocialLogin;
