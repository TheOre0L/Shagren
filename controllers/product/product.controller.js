const bd = require('../../bd');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const LogsService = require('../logs.controller');

class collorController {
    // COLLOR
    // async colorAdd(req, res) {
    //     try {
    //         let { colorName } = req.body;

    //         const newColor = await bd.query(
    //             'INSERT INTO color (colorName) ' + 'VALUES ($1) RETURNING *',
    //             [colorName]
    //         );

    //         return res.status(200).json({
    //             message: 'Цвет успешно добавлен!',
    //             color: newColor.rows[0],
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         return res.status(500).json({
    //             message: 'Произошла непредвиденная ошибка!',
    //             error: error,
    //         });
    //     }
    // }
}



class productController {
    //PRODUCT
    async productAction(req, res) {
        const {action} = req.query;
        if(action === "added") {
            try {
                let {title, description, price, images, typeId, categId, accordions, colors, userid } =
                    req.body;

                const newProduct = await bd.query(
                    'INSERT INTO product (title, description, price, images, typeid, categoryid, accordions, colors) ' +
                    'VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
                    [title, description, price, images, typeId, categId, accordions, colors]
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
        else if(action === "editable") {
            try {

                let { id, name, price, images, count, description, type } = req.body;

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
        else if(action === "delete") {
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
        else if(action === "recovery") {
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
        else if(action === "get") {
            try {
                const {id} = req.body;
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
    }
async productAllGet(req, res) {
        try {
            const allProducts = await bd.query(
                'SELECT * FROM product WHERE view = true'
            );
                const { page = 1, limit = 9 } = req.query;
                const startIndex = (page - 1) * limit;
                const endIndex = page * limit;
                
                const paginatedItems = allProducts.rows.slice(startIndex, endIndex);
                
                res.status(200).json({
                  items: paginatedItems,
                  total: allProducts.rows.length
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