const express = require('express'); 
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const userController = require('../controller/user.controller');

router.get('/' , userController.getHome);

router.get('/login', userController.getLogin);

router.post('/login', validate.login ,userController.postLogin);

router.get('/register', userController.getRegister);

router.post('/register', validate.register ,userController.postRegister);


module.exports = router;