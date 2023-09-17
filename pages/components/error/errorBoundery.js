import React from 'react';
class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props);

		// Define a state variable to track whether is an error or not
		this.state = { hasError: false };
	}
	static getDerivedStateFromError(error) {
		return { hasError: true };
	}
	componentDidCatch(error, errorInfo) {
		// You can use your own error logging service here
		console.log({ error, errorInfo });
	}
	render() {
		if (this.state.hasError) {
			return (
				<div>
					<h2>Oops, there is an error!</h2>
					<button
						type="button"
						onClick={() => this.setState({ hasError: false })}
					>
						Try again?
					</button>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
