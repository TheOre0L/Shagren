const bd = require('../bd');
const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const ApiError = require('../exceptions/api-error');
const tokenService = require('./tokens.controller');
const mailService = require('./mail.controller');
const LogsService = require('./logs.controller');

class AuthorisationController {
    async registration(req, res) {
        try {
            function validateEmail(email) {
                let re = /\S+@\S+\.\S+/;
                return re.test(email);
            }
            let { login, password, fio, email, city, phoneNumber } = req.body;
            if (login.length == 0) login = null;
            if (password.length == 0) password = null;
            if (fio.length == 0) fio = null;
            if (city.length == 0) city = null;
            if (phoneNumber.length == 0) phoneNumber = null;
            console.log(email);
            if (!validateEmail(email))
                return res.status(400).json({
                    message:
                        'Указанное значение не является электронной почтой!',
                });
            const hashPassword = await bcrypt.hash(password, 3);
            const newUser = await bd.query(
                'INSERT INTO person (login, password, fio, email, city, telephone) ' +
                    'VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [login, hashPassword, fio, email, city, phoneNumber]
            );
            LogsService.addLog(
                newUser.rows[0].id,
                'Регистрация пользователя',
                `Регистрация пользователя ${JSON.stringify(newUser.rows[0])}`
            );
            const tokens = await tokenService.generateTokens({
                id: newUser.rows[0].id,
                email: newUser.rows[0].email,
                role: newUser.rows[0].role,
            });
            const user = newUser.rows[0];
            await tokenService.saveToken(user.id, tokens.refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res.json({
                message: 'Успешная регистрация!',
                ...tokens,
                user,
            });
        } catch (e) {
            if (e.code == '23505') {
                return res.status(400).json({
                    message: 'Пользователь с таким логином уже есть!',
                });
            }
            switch (e.column) {
                case 'surname':
                    return res
                        .status(400)
                        .json({ message: 'Укажите фамилию!' });
                case 'name':
                    return res.status(400).json({ message: 'Укажите имя!' });
                case 'login':
                    return res.status(400).json({ message: 'Укажите логин!' });
                case 'password':
                    return res.status(400).json({ message: 'Укажите пароль!' });
                case 'city':
                    return res.status(400).json({ message: 'Укажите город!' });
                default:
                    return res
                        .status(500)
                        .json({ message: 'Непредвиденная ошибка!' });
            }
        }
    }

    async login(req, res) {
        try {
            const { login, password } = req.body;
            const userDto = await bd.query(
                'SELECT * FROM person WHERE login = $1',
                [login]
            );
            const user = userDto.rows[0];
            if (!user) {
                return res
                    .status(400)
                    .json({ message: 'Неверный логин или пароль' });
            }
            const isPassEquals = await bcrypt.compare(password, user.password);
            if (!isPassEquals) {
                return res
                    .status(400)
                    .json({ message: 'Неверный логин или пароль' });
            }
            const tokens = tokenService.generateTokens({ ...user });
            await tokenService.saveToken(user.id, tokens.refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
            });
            return res
                .status(200)
                .json({ message: 'Успешный вход в аккаунт!', tokens, user });
        } catch (e) {
            return res.status(500).json({ message: 'Непредвиденная ошибка!' });
        }
    }

    async logout(req, res) {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                throw ApiError.UnauthorizedError();
            }
            const userData =
                await tokenService.validateRefreshToken(refreshToken);
            if (!userData) {
                throw ApiError.UnauthorizedError();
            }
            const token = await tokenService.removeToken(userData.id);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            return res.status(500).json({ message: 'Непредвиденная ошибка!' });
        }
    }

    async refresh(req, res) {
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) {
                throw ApiError.UnauthorizedError();
            }
            const user = await tokenService.validateRefreshToken(refreshToken);
            const userData = await bd.query(
                'SELECT * FROM person WHERE id = $1',
                [user.id]
            );
            const resultUser = userData.rows[0];
            if (!resultUser) {
                throw ApiError.UnauthorizedError();
            }
            const tokens = tokenService.generateTokens({ user });
            await tokenService.saveToken(resultUser.id, tokens.refreshToken);
            return res.json({ ...tokens, user: resultUser });
        } catch (e) {
            return res.status(500).json({ message: 'Непредвиденная ошибка!' });
        }
    }
}
class UserController {
    // async getOneUser(req, res) {
    //     try {
    //     } catch (e) {
    //         console.log(e);
    //         return res.status(500).json({ message: 'Непредвиденная ошибка!' });
    //     }
    // }
}

module.exports = new UserController();
module.exports = new AuthorisationController();
