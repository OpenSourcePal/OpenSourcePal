import jwt from 'jsonwebtoken';
import express from 'express';
const UserRouter = express.Router();

import { addUser } from '../controllers/user';
import { SECRET } from '../utils/config';
import { User } from '../models/User';

UserRouter.route('/user').post(addUser);
UserRouter.route('/protected').get(async (req: any, res: any) => {
	const authHeader = req.headers.authorization;

	if (authHeader) {
		const token = authHeader.split(' ')[1];

		try {
			jwt.verify(token, SECRET as string, async (err: any, decoded: any) => {
				if (err) {
					res.status(401).json({ isSuccess: false, message: 'invalid token' });
				} else {
					const user = await User.findOne({ name: decoded.name });
					if (!user) {
						return res.status(400).json({
							isSuccess: false,
							message: 'User doesn`t exist',
						});
					}
					res.status(200).json({ isSuccess: true, message: decoded.name });
				}
			});
		} catch (err) {
			return res
				.status(401)
				.json({ isSuccess: false, message: 'Invalid token' });
		}
	} else {
		return res
			.status(401)
			.json({ isSuccess: false, message: 'Missing authorization header' });
	}
});

export default UserRouter;
