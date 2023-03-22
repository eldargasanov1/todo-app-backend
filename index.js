import express from 'express';
import multer from 'multer';
import mongoose from 'mongoose';
import cors from 'cors';

import {
	registerValidation,
	loginValidation,
	taskCreateValidation,
	taskUpdateValidation,
} from './validations.js';
import { checkAuth, handleValidationErrors } from './utils/index.js';
import { UserController, TaskController } from './controllers/index.js';

console.log(process.env);

mongoose
	.connect(process.env.MONGODB_URI)
	.then(() => console.log('DB ok'))
	.catch(() => console.log('DB error', err));

const app = express();

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, 'uploads');
	},
	filename: (_, file, cb) => {
		cb(null, file.originalname);
	},
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

app.post(
	'/auth/login',
	loginValidation,
	handleValidationErrors,
	UserController.login
);
app.post(
	'/auth/register',
	registerValidation,
	handleValidationErrors,
	UserController.register
);
app.get('/auth/me', checkAuth, UserController.getMe);

app.post('/upload', upload.single('image'), (req, res) => {
	res.json({
		url: `uploads/${req.file.originalname}`,
	});
});

app.get('/tasks', checkAuth, TaskController.getAll);
app.get('/tasks/:id', checkAuth, TaskController.getOne);
app.post(
	'/tasks',
	checkAuth,
	taskCreateValidation,
	handleValidationErrors,
	TaskController.create
);
app.delete('/tasks/:id', checkAuth, TaskController.remove);
app.patch(
	'/tasks/:id',
	checkAuth,
	taskUpdateValidation,
	handleValidationErrors,
	TaskController.update
);

app.listen(process.env.PORT || 4444, err => {
	if (err) {
		return console.log(err);
	}

	console.log('Server Ok');
});
