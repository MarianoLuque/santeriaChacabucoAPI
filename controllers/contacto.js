const {handleHttpError} = require('../utils/handleError.js')
const nodemailer = require('nodemailer');
const {EMAIL_CONTACTO, CONTRA_EMAIL_CONTACTO, EMAIL_SANTERIA} = require('../config/config.js')

const createItems = async (req, res) =>{
    try {
        const { name, email, message } = req.body;
        const subject = "PEDIDOS ONLINE SANTERIA"
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          port: 465,
          secure: true,
          auth: {
            user: EMAIL_CONTACTO,
            pass: CONTRA_EMAIL_CONTACTO,
          },
          tls: {
            rejectUnauthorized: false
          }
        });
        console.log(EMAIL_CONTACTO, CONTRA_EMAIL_CONTACTO)
        const mailOptions = {
          from: EMAIL_CONTACTO,
          to: EMAIL_SANTERIA,
          subject: subject,
          text: `Nombre del cliente: ${name}\n\nEmail del cliente: ${email}\n\n${message}`
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            handleHttpError(res, 'Error al enviar el correo electrónico', error, 500)
          } else {
            console.log('Correo electrónico enviado: ' + info.response);
            res.status(200).send('Correo electrónico enviado correctamente');
          }
        });
    } catch (err) {
      console.log(err)
      handleHttpError(res, 'ERROR ENVIAR EMAIL', err, 500)
    }  
}

module.exports = {createItems}