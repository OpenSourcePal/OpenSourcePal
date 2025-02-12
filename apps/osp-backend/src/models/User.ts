import { model, Model, Schema, models, ObjectId, Document } from 'mongoose';

export interface IUser extends Document {
	_id: ObjectId;
	name: string;
	lastUsed: Date;
	numberOfUsagePerDay: {
		number: number;
		date: Date;
	};
	isAllowed: boolean;
	projects: {
		name: string;
		hasReadReadme: boolean;
	}[];
}

interface IUserDocument extends IUser {}

interface IUserModel extends Model<IUserDocument> {}

const UserSchema: Schema = new Schema<IUserDocument, IUserModel>({
	name: { type: String, required: true, unique: true },
	lastUsed: { type: Date, required: true },
	numberOfUsagePerDay: {
		type: {
			number: Number,
			date: Date,
		},
	},
	isAllowed: { type: Boolean, default: false },
	projects: {
		type: [
			{
				name: { type: String, required: true },
				hasReadReadme: { type: Boolean, default: false },
			},
		],
		default: [],
	},
});


UserSchema.set('toJSON', {
	transform: (document, objectToBeReturned) => {
		objectToBeReturned.id = objectToBeReturned._id.toString();
		delete objectToBeReturned._id;
		delete objectToBeReturned.__v;
	},
});

export const User =
	models.User || model<IUserDocument, IUserModel>('User', UserSchema);
