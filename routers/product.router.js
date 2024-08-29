const Router = require('express');
const router = new Router();
const productController = require('../controllers/product/product.controller');
const productTypeController = require('../controllers/product/type.controller/type.controller');
const collorController = require('../controllers/product/product.controller');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();
const authMiddleware = require('../middlewares/auth.middelewares');

//PRODUCTS
router.post('/', urlencodedParser, jsonParser, productController.productAction);
router.get('/items', productController.productAllGet);

// TYPES
router.post('/type', urlencodedParser, jsonParser, productTypeController.typeAction);

// //COLORS
// router.post(
//     '/color/add/:id',
//     urlencodedParser,
//     jsonParser,
//     collorController.colorAdd
// );
 
module.exports = router;
