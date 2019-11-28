const mongoose = require('mongoose')
const Schema = mongoose.Schema

const contectEmailSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Mailketing_user'
    },
    friend: {
        type: Schema.Types.ObjectId,
        ref: 'Mailketing_user'
    },





}, {
    versionKey: false,
    timestamps: true
})

module.exports = mongoose.model('Transaksi', contectEmailSchema)