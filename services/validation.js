import { body } from 'express-validator'

export const registration = [
    body('username').isLength({ min: 3, max: 16 }).isString(),
    body('email').isEmail(),
    body('password', 'Құпия сөзіңіз').isLength({ min: 6, max: 16 }).isString()
]

export const login = [
    body('username').optional().isLength({ min: 3, max: 16 }).isString(),
    body('email').optional().isEmail(),
    body('password', 'Құпия сөзіңіз').isLength({ min: 6, max: 16 }).isString()
]

export const updatingProfile = [
    body('name').isLength({min: 3}).isString(),
    body('phone').isLength({min: 11}).isString(),
    body('address').isLength({min: 3}).isString()
]

export const order = [
    body('title').optional().isLength({ min: 3 }).isString(),
    body('description').optional().isLength({ min: 3 }).isString(),
    body('category').optional().isString(),
    body('datetime').optional().isString(),
    body('carBody').optional().isString(),
    body('img').optional().isString(),
]
