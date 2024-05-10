const Router = require('express');
const router = new Router();
const basketController = require('../controllers/basket.controller');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();
const authMiddleware = require('../middlewares/auth.middelewares');

//PRODUCTS
router.post('/add', urlencodedParser, jsonParser, basketController.productAdd);

router.put('/update', urlencodedParser, jsonParser, basketController.productUpdate);

router.delete('/delete', urlencodedParser, jsonParser, basketController.productDelete);

module.exports = router;
