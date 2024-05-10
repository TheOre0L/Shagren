const bd = require('../bd');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const LogsService = require('./logs.controller');

class basketController {
    //BASKET
    async productAdd(req, res) {
        try {
            let { userid, productId } =
                req.body;

            const basketAdd = await bd.query(
                'INSERT INTO basket (userId, productId) ' +
                    'VALUES ($1, $2) RETURNING *',
                [userid, productId]
            );
            return res.status(200).json({
                message: 'Продукт успешно добавлен в корзину!',
                product: basketAdd.rows[0],
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Произошла непредвиденная ошибка!',
                error: error,
            });
        }
    }
    async productEdit(req, res) {
        try {
            const id = req.params.id;
            let { count } = req.body;

            const changeCount = await bd.query(
                'UPDATE basket SET count=$1 WHERE id = $2 RETURNING *',
                [count, id]
            );

            return res.status(200).json({
                message: 'Товар в корзине успешно удален!',
                product: changeCount.rows[0],
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Произошла непредвиденная ошибка!',
                error: error,
            });
        }
    }
    async productDelete(req, res) {
        try {
            let { id } = req.body;

            const deleteProduct = await bd.query(
                'DELETE FROM basket WHERE id = $1 RETURNING *',
                [id]
            );
            return res.status(200).json({
                message: 'Товар успешно удален из корзины!',
                product: deleteProduct.rows[0],
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Произошла непредвиденная ошибка!',
                error: error,
            });
        }
    }
}

module.exports = new productController();
