const bd = require('../bd');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const LogsService = require('./logs.controller');

class reviewController {
    //BASKET
    async newReview(req, res) {
        try {
            let { userid, productId, text, mark } =
                req.body;

            const basketAdd = await bd.query(
                'INSERT INTO review (userId, productId, text, mark) ' +
                    'VALUES ($1, $2, $3, $4) RETURNING *',
                [userid, productId, text, mark]
            );
            LogsService.addLog(
                userid,
                'Добавление отзыва',
                `Добвление отзыва ${JSON.stringify(newReview.rows[0])}`
            );
            return res.status(200).json({
                message: 'Отзыв успешно опубликован!',
                review: newRiview.rows[0],
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Произошла непредвиденная ошибка!',
                error: error,
            });
        }
    }
    async reviewEdit(req, res) {
        try {
            const id = req.params.id;
            let { text, mark } = req.body;

            const updateReview = await bd.query(
                'UPDATE rewiev SET text=$1, mark=$2 WHERE id = $3 RETURNING *',
                [text, mark, id]
            );
            LogsService.addLog(
                userid,
                'Изменение отзыва',
                `Изменение отзыва ${JSON.stringify(updateReview.rows[0])}`
            );
            return res.status(200).json({
                message: 'Отзыв успешно изменен!',
                review: updateReview.rows[0],
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Произошла непредвиденная ошибка!',
                error: error,
            });
        }
    }
    async reviewDelete(req, res) {
        try {
            let { id } = req.body;

            const deleteReview = await bd.query(
                'DELETE FROM review WHERE id = $1 RETURNING *',
                [id]
            );
            LogsService.addLog(
                userid,
                'Удаление отзыва',
                `Удаление отзыва ${JSON.stringify(deleteReview.rows[0])}`
            );
            return res.status(200).json({
                message: 'Отзыв успешно удален!',
                review: deleteReview.rows[0],
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
