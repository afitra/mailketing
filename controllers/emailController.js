const Model = require('../models/user')
const jwt = require('../helpers/jwt')

const { sendEmailHelper } = require('../helpers/emailSender')

const axios = require('axios')

class emailController {

    static sendEmail(req, res, next) {
        console.log(req.body.wysywg, '>>>', req.body.data);

        for (let i = 0; i < req.body.data.length; i++) {
            const element = req.body.data[i];
            async function send() {
                await sendEmailHelper(
                    element.email,
                    'Notification',
                    req.body.wysywg)
            }
            if (element.checked == true) {
                send()

            }

        }

    }
}

module.exports = emailController