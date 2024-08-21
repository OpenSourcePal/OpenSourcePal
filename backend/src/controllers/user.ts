import jwt from 'jsonwebtoken';

import { info, error } from '../utils/logger';
import { SECRET } from '../utils/config';

import { User } from '../models/User';

export const addUser = async (req: any, res: any) => {
	try {
		const { name } = req.body;
		if (!name) {
			return res
				.status(401)
				.json({ isSuccess: false, message: 'No data received from client' });
		}

		const existingUser = await User.findOne({ name });
		const token = jwt.sign({ name }, SECRET as string, { expiresIn: '31d' });
		if (existingUser) {
			return res
				.status(200)
				.json({ isSuccess: true, message: existingUser, token });
		}

		const userDetails = {
			name,
			lastUsed: new Date(),
		};

		info(userDetails);

		const user = new User(userDetails);
		await user.save();

		res.status(200).json({ isSuccess: true, message: user, token });
	} catch (err) {
		error(`Error in addUser: ${err}`);
		res
			.status(500)
			.json({ isSuccess: false, message: 'Internal Server Error' });
	}
};

// const updateCount = async (req: any, res: any) => {
// 	console;
// 	try {
// 		const { name } = req.body;
// 		if (!name) {
// 			return res
// 				.status(401)
// 				.json({ isSuccess: false, message: 'No data received from client' });
// 		}

// 		const user = await User.findOne({ name });
// 		if (!user) {
// 			return res
// 				.status(401)
// 				.json({ isSuccess: false, message: `User doesn't exist` });
// 		}
// 		const today = new Date();
// 		today.setHours(0, 0, 0, 0);

// 		// Check if the date matches today
// 		if (user.numberOfUsagePerDay?.date?.getTime() === today.getTime()) {
// 			// Check the usage limit
// 			if (user.numberOfUsagePerDay.number >= 3) {
// 				// Limit exceeded
// 				return res
// 					.status(406)
// 					.json({ isSuccess: false, message: `User has exist the limit` });
// 			} else {
// 				user.numberOfUsagePerDay.number++;
// 			}
// 		} else {
// 			// No entry for today, create one
// 			user.numberOfUsagePerDay = { number: 1, date: today };
// 		}
// 		await user.save();
// 		return res.status(204).json({ isSuccess: true, message: `Go ahead` });
// 	} catch (error) {
// 		error(`Error in addUser: ${error}`);
// 		res
// 			.status(500)
// 			.json({ isSuccess: false, message: 'Internal Server Error' });
// 	}
// };

export const protectedRoute = (req: any, res: any, next: any) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(' ')[1];

		jwt.verify(token, SECRET as string, async (err: any, decoded: any) => {
			if (err) {
				res.status(401).json({ isSuccess: false, message: 'invalid token' });
			} else {
				// Assign the decoded email to the request object
				req.user = decoded.name;
				console.log({ name: decoded.name });
				// check if user exists
				const user = await User.findOne({ name: decoded.name });
				console.log({ user });
				if (!user) {
					return res.status(400).json({
						message: 'User doesn`t exist',
					});
				}
				next();
			}
		});
	} else {
		res.status(401).json({ message: 'Missing authorization header' });
	}
};
