export const handleError = (error: any) => {
    if (error.response && error.response.data && error.response.data.message) {
		throw new Error(
			`${error.response.data.message}`
		);
	} else {
		if (error.message.includes('Network Error')) {
			const errorMessage = 'Network error. Please check your connection and try again.';
		}
		throw new Error(`Axios Error: ${error.message}`);
	}
};
