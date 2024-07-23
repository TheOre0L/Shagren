const bd = require('../bd');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const LogsService = require('./logs.controller');

class collorController {
    // COLLOR
    async colorAdd(req, res) {
        try {
            let { colorName } = req.body;

            const newColor = await bd.query(
                'INSERT INTO color (colorName) ' + 'VALUES ($1) RETURNING *',
                [colorName]
            );

            return res.status(200).json({
                message: 'Цвет успешно добавлен!',
                color: newColor.rows[0],
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

class productTypeController {
    //PRODUCT_TYPE
    async typeAdd(req, res) {
        try {
            let { name } =
                req.body;

            const newType = await bd.query(
                'INSERT INTO product (name) ' +
                    'VALUES ($1) RETURNING *',
                [name]
            );
            LogsService.addLog(
                userid,
                'Создание категории',
                `Создание категории ${JSON.stringify(newType.rows[0])}`
            );
            return res.status(200).json({
                message: 'Категория успешно добавлена!',
                type: newType.rows[0],
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Произошла непредвиденная ошибка!',
                error: error,
            });
        }
    }

    async typeDelete(req, res) {
        try {
            const id = req.params.id;

            const newType = await bd.query(
                'SELECT * FROM product WHERE typeId = $1 AND view = true * RETURNING *',
                [typeId]
            );
        }
        catch (error) {
        }
    }
}

class productController {
    //PRODUCT
    async productAdd(req, res) {
        try {
            let { name, price, images, count, description, type, userid } =
                req.body;

            const newProduct = await bd.query(
                'INSERT INTO product (name, price, images, count, description, type) ' +
                    'VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [name, price, images, count, description, type]
            );
            LogsService.addLog(
                userid,
                'Создание товара',
                `Создание товара ${JSON.stringify(newProduct.rows[0])}`
            );
            return res.status(200).json({
                message: 'Продукт успешно добавлен!',
                product: newProduct.rows[0],
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
            let { name, price, images, count, description, type } = req.body;

            const updateProduct = await bd.query(
                'UPDATE product SET name = $1, price = $2, images = $3, count =$4, description =$5, type =$6 WHERE id = $7 RETURNING *',
                [name, price, images, count, description, type, id]
            );

            return res.status(200).json({
                message: 'Продукт успешно обновлен!',
                product: updateProduct.rows[0],
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
                'UPDATE product SET view = false WHERE id = $1 RETURNING *',
                [id]
            );
            LogsService.addLog(
                userid,
                'Удаление товара',
                `удаление товара ${JSON.stringify(deleteProduct.rows[0])}`
            );
            return res.status(200).json({
                message: 'Товар успешно удален!',
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
    async productRecovery(req, res) {
        try {
            let { id } = req.body;

            const deleteProduct = await bd.query(
                'UPDATE product SET view = true WHERE id = $1 RETURNING *',
                [id]
            );
            LogsService.addLog(
                userid,
                'Восстановление товара',
                `Восстановление товара ${JSON.stringify(
                    this.productRecovery.rows[0]
                )}`
            );
            return res.status(200).json({
                message: 'Товар успешно восстановлен!',
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
    async productGet(req, res) {
        try {
            const id = req.params.id;
            const products = await bd.query(
                'SELECT * FROM product WHERE id = $1',
                [id]
            );
            return res.status(200).json({ product: products.rows[0] });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                message: 'Произошла непредвиденная ошибка!',
                error: error,
            });
        }
    }
    async productAllGet(req, res) {
        try {
            const allProducts = await bd.query(
                'SELECT * FROM product WHERE view = true'
            );
            return res.status(200).json({ products: allProducts.rows });
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
module.exports = new productTypeController();
module.exports = new collorController();