const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth:{
        type: 'login',
        user: 'presets.anitathomas@gmail.com',
        pass: `${process.env.GMAIL_PASS}`,
    },
})
transporter.verify()
        .then(()=>{
            console.log('Listo para enviar emails')
        })

module.exports = { 
    transporter: transporter
}