const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    // service: "gmail",
    // auth:{
    //     type: 'login',
    //     user: 'presets.anitathomas@gmail.com',
    //     pass: `${process.env.GMAIL_PASS}`,
    // },
    host: "anitathomas.com.ar",
    port: 465,
    auth:{
        user: 'presets@anitathomas.com.ar',
        pass: `7syqa8SlF;]E`,
    },
})
transporter.verify()
        .then(()=>{
            console.log('Listo para enviar emails')
        }).catch(e=>{
            console.log(e)
        })

module.exports = { 
    transporter: transporter
}