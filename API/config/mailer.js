const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    port: 465,
    auth:{
        user: 'presets@anitathomas.com.ar',
        pass: `Rambogato13.`,
    },
})
transporter.verify()
        .then(()=>{
            console.log('Listo para enviar emails')
        }).catch(e=>{
            console.log('Hay un Error con ', e)
        })

module.exports = { 
    transporter: transporter
}