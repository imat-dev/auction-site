import User, { IUser } from '@/model/user';
import { hashPassword } from '@/util/auth';
import service from '@/service';
import { connectToDatabase } from '@/util/mongo';
import userValidationSchema from '@/util/validationSchema';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== 'POST') {
		return res.status(405).end(); // Method Not Allowed
	}

	const validation = userValidationSchema.validate(req.body, {
		abortEarly: false,
	});

	if (validation.error) {
		res.status(400).json({
			message: 'Please enter valid inputs.',
			errors: validation.error,
		});
		return;
	}

	const hashedPassword = await hashPassword(req.body.password);
	const newUser: IUser = {
		email: req.body.email,
		password: hashedPassword,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
	};

	let isEmailTaken;
	try {
		isEmailTaken = await service.userService.findUserByEmail(newUser.email);
	} catch (e) {
		//put error logger here
		console.log("Failed checking if there's an existing email.");
		res.status(500).json({ message: 'Internal server error.' });
		return;
	}

	if (isEmailTaken) {
		res.status(400).json({ message: 'Email already taken' });
		return;
	}

	try {
		await service.userService.createUser(newUser);
	} catch (error) {
		//put error logger here
		console.log('Failed to register the user');
		res.status(500).json({ message: 'Internal server error.' });
		return;
	}

	res.status(200).json({ message: 'Success!' });
};

export default handler;
