const Router = require('express');
const router = new Router();
const productController = require('../controllers/product.controller');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();
const authMiddleware = require('../middlewares/auth.middelewares');

//PRODUCTS
router.post('/add', urlencodedParser, jsonParser, productController.productAdd);
router.put(
    '/edit/:id',
    urlencodedParser,
    jsonParser,
    productController.productEdit
);
router.put(
    '/delete/:id',
    urlencodedParser,
    jsonParser,
    productController.productDelete
);

router.put(
    '/recovery/:id',
    urlencodedParser,
    jsonParser,
    productController.productRecovery
);

router.get('/id=:id', authMiddleware, productController.productGet);
router.get('/all', productController.productAllGet);

//TYPES
router.post('/type/create', urlencodedParser, jsonParser, productController.productAdd);
router.delete('/type/delete/:id', urlencodedParser, jsonParser, productController.productDelete);

//COLORS
router.post(
    '/color/add/:id',
    urlencodedParser,
    jsonParser,
    productController.colorAdd
);

module.exports = router;
