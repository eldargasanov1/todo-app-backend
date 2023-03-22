import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		subtitle: String,
		completed: {
			type: Boolean,
			required: true,
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model('Task', TaskSchema);
