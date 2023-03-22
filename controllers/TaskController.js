import TaskModel from '../models/Task.js';

const getAll = async (req, res) => {
	try {
		const filterOptions = {
			user: req.userId,
		};

		if (req.headers.filter === 'active') {
			filterOptions.completed = false;
		}
		if (req.headers.filter === 'completed') {
			filterOptions.completed = true;
		}

		const tasks = await TaskModel.find(filterOptions);

		res.json(tasks);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось получить задачи',
		});
	}
};

const getOne = async (req, res) => {
	try {
		const task = await TaskModel.findOne({
			user: req.userId,
			_id: req.params.id,
		});

		if (!task) {
			return res.status(404).json({
				message: 'Задача не найдена',
			});
		}

		res.json(task);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось получить задачу',
		});
	}
};

const create = async (req, res) => {
	try {
		const doc = new TaskModel({
			title: req.body.title,
			completed: req.body.completed,
			user: req.userId,
		});

		const task = await doc.save();

		res.json(task);
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось создать задачу',
		});
	}
};

const remove = async (req, res) => {
	try {
		const result = await TaskModel.findOneAndDelete({
			user: req.userId,
			_id: req.params.id,
		});

		if (!result) {
			return res.status(404).json({
				message: 'Задача не найдена',
			});
		}

		res.json({
			success: true,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось получить задачу',
		});
	}
};

const update = async (req, res) => {
	try {
		await TaskModel.updateOne(
			{
				user: req.userId,
				_id: req.params.id,
			},
			{
				title: req.body.title,
				subtitle: req.body.subtitle,
				completed: req.body.completed,
				user: req.userId,
			}
		);

		res.json({
			success: true,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			message: 'Не удалось обновить задачу',
		});
	}
};

export { getAll, getOne, create, remove, update };
