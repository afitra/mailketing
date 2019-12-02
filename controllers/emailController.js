const Model = require('../models/user')
const jwt = require('../helpers/jwt')

const cron = require('node-cron'),
    kue = require('kue'),
    queue = kue.createQueue()
const { sendEmailHelper } = require('../helpers/emailSender')

const axios = require('axios')

class emailController {

    static sendEmail(req, res, next) {

        for (let i = 0; i < req.body.data.length; i++) {
            const element = req.body.data[i];

            if (element.checked == true) {
                queue
                    .create('email', {
                        email: element.email,
                        Notification: 'Notification',
                        wysywg: req.body.wysywg
                    })
                    .save()


            }

        }
        queue.process('email', function (dataQueue, done) {
            sendEmailHelper(dataQueue.data.email, dataQueue.data.Notification, dataQueue.data.wysywg)
            done()
        })

    }
}

module.exports = emailController