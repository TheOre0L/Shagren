const bd = require('../../../bd');
const LogsService = require('../../logs.controller');

class productTypeController {
    //PRODUCT_TYPE
    async typeAction(req, res) {
        const { action, subjet } = req.query;
        if(action === "added") {
            try {
                let { title, userid } =
                    req.body;
                if(subjet === "type"){
                    const newType = await bd.query(
                        'INSERT INTO type (title) ' +
                        'VALUES ($1) RETURNING *',
                        [title]
                    );
                    LogsService.addLog(
                        userid,
                        'Создание типа продукта',
                        `Создание типа продукта ${JSON.stringify(newType.rows[0])}`
                    );
                    return res.status(200).json({
                        message: 'Тип успешно добавлен!',
                        type: newType.rows[0],
                    });
                }
                else if(subjet === "category"){
                    const newCategory = await bd.query(
                        'INSERT INTO category (title) ' +
                        'VALUES ($1) RETURNING *',
                        [title]
                    );
                    LogsService.addLog(
                        userid,
                        'Создание категории',
                        `Создание категории ${JSON.stringify(newCategory.rows[0])}`
                    );
                    return res.status(200).json({
                        message: 'Категория успешно добавлена!',
                        categories: newCategory.rows[0],
                    });
                }
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: 'Произошла непредвиденная ошибка!',
                    error: error,
                });
            }
        } else if (action === "delete") {
            try {
                if(subjet === "type"){
                    const {id} = req.body;
                    await bd.query(
                        'DELETE FROM type WHERE id = $1',
                        [id]
                    );
                    const Types = await bd.query(
                        'SELECT * FROM type',
                    );
                    return res.status(200).json({
                        message: 'Тип был удален!',
                        type: Types.rows,
                    });
                } else if(subjet === "category"){
                    const {id} = req.body;
                    await bd.query(
                        'DELETE FROM category WHERE id = $1',
                        [id]
                    );
                    const Categoryes = await bd.query(
                        'SELECT * FROM category',
                    );
                    return res.status(200).json({
                        message: 'Категория была удалена!',
                        categories: Categoryes.rows,
                    });
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: 'Произошла непредвиденная ошибка!',
                    error: error,
                });
            }
        } else if (action === "get") {
            try {
                const {id} = req.body;
                if(subjet === "type"){
                    if(id){
                        const Type = await bd.query(
                            'SELECT * FROM type WHERE id = $1',
                            [id]
                        );
                        return res.status(200).json({
                            message: 'Тип продукции!',
                            type: Type.rows[0],
                        });
                    } else {
                        const allTypes = await bd.query(
                            'SELECT * FROM type',
                        );
                        return res.status(200).json({
                            message: 'Типы продукции!',
                            type: allTypes.rows,
                        });
                    }
                } else if (subjet === "category") {
                    if(id){
                        const category = await bd.query(
                            'SELECT * FROM category WHERE id = $1',
                            [id]
                        );
                        return res.status(200).json({
                            message: 'Тип продукции!',
                            categories: category.rows[0],
                        });
                    } else {
                        const allCategoryes = await bd.query(
                            'SELECT * FROM category',
                        );
                        return res.status(200).json({
                            message: 'Типы продукции!',
                            categories: allCategoryes.rows,
                        });
                    }
                }
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    message: 'Произошла непредвиденная ошибка!',
                    error: error,
                });
            }
        }
    }
}

module.exports = new productTypeController();