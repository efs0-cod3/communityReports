const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const ReportSchema = new Schema({
    title: {
        type: String,
        requiered: true
    },
    report_content: {
        type: String,
        requiered: true
    },
    r_img: {
        type: Buffer,
    },
    date: {
        type: Date,
        default: Date.now
    }
})


const Report = mongoose.model('Report', ReportSchema)

module.exports = Report
 // this to be able to use Report in other files