const Router = require('express');
const router = new Router();
const reviewController = require('../controllers/review.controller');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();
const authMiddleware = require('../middlewares/auth.middelewares');

//PRODUCTS
router.post('/add', urlencodedParser, jsonParser, reviewController.productAdd);

router.put('/update', urlencodedParser, jsonParser, reviewController.productUpdate);

router.delete('/delete', urlencodedParser, jsonParser, reviewController.productDelete);

module.exports = router;
