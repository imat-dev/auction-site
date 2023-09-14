export const isAuthenticated = (session: any): boolean => {
	return session.status === "authenticated";
};

export const getName = (session: any): string | null => {
	if (isAuthenticated(session)) {
		return session.data.user.name;
	}
	return null;
};