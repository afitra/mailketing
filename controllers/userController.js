
const User = require('../models/user')
const { tokenGenerate } = require('../helpers/jwt.js')
const { comparePassword } = require('../helpers/bycrypt')
var jwtDecode = require('jwt-decode');


const axios = require('axios')

class userController {



    static removeEmail(req, res, next) {
        var validate = jwtDecode(req.headers.token)
        User.updateOne({ _id: validate.id },
            { $pull: { friends: { _id: req.body.friendId } } }, { new: true })
            .then(data => {
                console.log(data);

            })

    }

    static register(req, res, next) {
        const { nama, email, pass } = req.body

        User.create({ nama, email, pass })
            .then(user => {
                res.status(200).json({
                    message: `Register Successfully`,
                })
            })
            .catch(next)
    }
    static login(req, res, next) {


        const { email, pass } = req.body
        User.find({ email })
            .then((data) => {
                data = data[0]
                if (data && comparePassword(pass, data.pass)) {
                    let payload = {
                        id: data._id,
                        email: data.email,
                    }

                    let token = tokenGenerate(payload)
                    res.status(200).json({ email: data.email, token })
                } else {
                    next({
                        status: 400,
                        message: `invalid email/pass`
                    })
                }
            })
            .catch(next)
    }

    static addFriend(req, res, next) {
        let verify = true
        let { email, role } = req.body

        if (role == undefined || role == null || role == '') {
            role = 'friend'
        }
        var validate = jwtDecode(req.headers.token)
        User.findById(validate.id)
            .then(data => {
                if (data.friends) {

                    for (let i = 0; i < data.friends.length; i++) {
                        const element = data.friends[i].email;

                        if (element == email) {
                            verify = false
                        }
                    }
                }
                if (verify == false) {
                    throw err
                } else {
                    return User.findByIdAndUpdate(validate.id, { $addToSet: { "friends": { email, role } } }, { new: true })
                }
            })
            .then(data => {
                res.status(200).json(data)
            })
            .catch(err => {
                console.log('ini err');

                next({
                    status: 400,
                    message: `Email already exist`
                })

            })

    }

    static addCategory(req, res, next) {
        const { role } = req.body
        var validate = jwtDecode(req.headers.token)
        User.findByIdAndUpdate(validate.id, { $addToSet: { "category": { role } } }, { new: true })
            .then(data => {
                res.status(200).json(data)
            })
    }

    static getEmail(req, res, next) {
        var validate = jwtDecode(req.headers.token)
        User.findByIdAndUpdate(validate.id)
            .then(data => {
                res.status(200).json(data.friends)

            })
    }
    static getCategory(req, res, next) {
        var validate = jwtDecode(req.headers.token)
        User.findByIdAndUpdate(validate.id)
            .then(data => {
                res.status(200).json(data.category)

            })

    }



}

module.exports = userController