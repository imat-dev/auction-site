import axios from 'axios';

export const handleError = (error: any) => {
    if (error.response && error.response.data && error.response.data.message) {
		throw new Error(
			`${error.response.data.message}`
		);
	} else {
		throw new Error(`Axios Error: ${error.message}`);
	}
};
