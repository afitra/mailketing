const router = require('express').Router(),
    emailController = require('./controllers/emailController'),
    userController = require('./controllers/userController')



// router.post('/email/add', emailController.addEmail)
router.post('/user/register', userController.register)
router.post('/user/login', userController.login)
router.post('/user/friend/add', userController.addFriend)
router.post('/user/category/add', userController.addCategory)
router.get('/user/get/email', userController.getEmail)
router.get('/user/get/category', userController.getCategory)

module.exports = router