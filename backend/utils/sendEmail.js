const nodemailer = require('nodemailer')

const sendEmail = async (mailContent) => {
    let transporter = nodemailer.createTransport({
        service: process.env.SMPT_SERVICE,
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        auth: {
            user: process.env.SMPT_USER,
            pass: process.env.SMPT_PASSWORD
        }
    })

    let mailOptions = {
        from: process.env.SMPT_USER,
        to: mailContent.email,
        subject: mailContent.subject,
        text: mailContent.message
    }

    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail