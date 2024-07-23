const Router = require('express');
const router = new Router();
const productController = require('../controllers/product.controller');
const productTypeController = require('../controllers/product.controller');
const collorController = require('../controllers/product.controller');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const jsonParser = bodyParser.json();
const authMiddleware = require('../middlewares/auth.middelewares');

//PRODUCTS
// router.post('/add', urlencodedParser, jsonParser, productController.productAdd);
// router.put(
//     '/edit/:id',
//     urlencodedParser,
//     jsonParser,
//     productController.productEdit
// );
// router.put(
//     '/delete/:id',
//     urlencodedParser,
//     jsonParser,
//     productController.productDelete
// );

// router.put(
//     '/recovery/:id',
//     urlencodedParser,
//     jsonParser,
//     productController.productRecovery
// );

// router.get('/id=:id', authMiddleware, productController.productGet);
router.get('/items', productController.productAllGet);

//TYPES
// router.post('/type/create', urlencodedParser, jsonParser, productTypeController.productAdd);
// router.delete('/type/delete/:id', urlencodedParser, jsonParser, productTypeController.productDelete);

// //COLORS
// router.post(
//     '/color/add/:id',
//     urlencodedParser,
//     jsonParser,
//     collorController.colorAdd
// );

const items = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Товар ${i + 1}`,
    images: [
      `https://via.placeholder.com/150?text=Image+${i + 1}`,
      `https://via.placeholder.com/150?text=Image+${i + 1}+2`
    ],
    categ: 'Сумки',
    type: 'Шоппер',
    accordions: [
      { id: 1, title: 'Описание', content: 'Описание товара' },
      { id: 2, title: 'Размеры и другое', content: 'Размеры товара' },
      { id: 3, title: 'Особенности', content: 'Особенности товара' },
      { id: 4, title: 'Преимущества', content: 'Преимущества товара' }
    ],
    commentsCount: Math.floor(Math.random() * 10),
    colors: [{ color: '🟠', id: 1 }, { color: '🟢', id: 2 }, { color: '⚫', id: 3 }],
    price: Math.floor(Math.random() * 10000),
    isLiked: Math.random() > 0.5,
    description: `Описание товара ${i + 1}`
  }));


  
module.exports = router;
