const Model = require('../models/user')
const jwt = require('../helpers/jwt')


const axios = require('axios')

class emailController {

    static addEmail(req, res, next) {
        console.log(req.body.email);

    }
}

module.exports = emailController