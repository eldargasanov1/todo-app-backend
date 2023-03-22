import { body } from 'express-validator';

export const registerValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен включать более 5 символов').isLength({
		min: 5,
	}),
	body('fullName', 'Укажите имя').isLength({ min: 2 }),
	body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL(),
];

export const loginValidation = [
	body('email', 'Неверный формат почты').isEmail(),
	body('password', 'Пароль должен включать более 5 символов').isLength({
		min: 5,
	}),
];

export const taskCreateValidation = [
	body('title', 'Напишите задачу').isLength({ min: 1 }).isString(),
	body('completed', 'Отсутствует completed').isBoolean(),
];

export const taskUpdateValidation = [
	body('title', 'Напишите задачу').isLength({ min: 1 }).isString(),
	body('subtitle', 'Напишите описание').optional().isString(),
	body('completed', 'Отсутствует completed').isBoolean(),
];
