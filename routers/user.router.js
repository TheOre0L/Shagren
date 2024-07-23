const Router = require("express")
const router = new Router()
const userController = require('../controllers/user.controller')
const authController = require('../controllers/user.controller')
const bodyParser = require('body-parser')
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const jsonParser = bodyParser.json()
const authMiddleware = require('../middlewares/auth.middelewares');

router.post('/registration', urlencodedParser, jsonParser, authController.registration);
router.post('/login', urlencodedParser ,jsonParser, authController.login)
// router.get('/user/:id', userController.getOneUser)
router.get('/refresh', authController.refresh)
router.get('/logout', authController.logout)

module.exports = router;