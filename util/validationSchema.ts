import Joi from 'joi';

const rules = {
	isEmail: Joi.string().email({ tlds: { allow: false } }),
	isNotEmpty: Joi.string().min(1).required(),
	isAlphaNumericOnly: Joi.string().alphanum().min(2).max(30).required(),
	isValidPassword: Joi.string()
		.min(6)
		.max(30)
		.regex(
			/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?!.*\s).*$/,
			'password'
		)
		.message('Invalid password format')
		.required(),
};

const userValidationSchema = Joi.object<{
	email: string;
	firstName: string;
	lastName: string;
	password: string;
}>({
	email: rules.isEmail,
	firstName: rules.isAlphaNumericOnly,
	lastName: rules.isAlphaNumericOnly,
	password: rules.isValidPassword,
});

export const isEmail = Joi.object<{ value: string }>({
	value: rules.isEmail,
});

export const isNotEmpty = Joi.object<{ value: string }>({
	value: rules.isNotEmpty,
});

export const isValidPassword = Joi.object<{ value: string }>({
	value: rules.isValidPassword,
});

export default userValidationSchema;
