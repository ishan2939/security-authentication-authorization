const express  = require('express');

const registerController = require('../controllers/register');
const loginController = require('../controllers/login');
const auth = require('../middleware/checkJWT');

const router = express.Router();

router.route('/register').post(registerController.register);

router.route('/login').post(loginController.login);

router.route('/').get(auth, (req,res) => {
    res.status(200).send("Welcome ishan🙌");
});

module.exports = router;