const fs = require('fs');
const nodemailer = require('nodemailer');

const PdfHelper = require('./pdf');

function emailPrescriptionAsPdf(prescription) {
    return new Promise(async (resolve, reject) => {
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'sim78@ethereal.email',
                    pass: '1XwYG2pPXq2Q3stGQp'
                }
            });

            let filePath = await PdfHelper.createPrescriptionPDF(prescription);

            const mailOptions = {
                from: process.env.EMAIL,
                to: prescription.patient.email,
                subject: 'Your Prescription',
                text: 'Please see attached PDF file',
                attachments: [
                    {
                        filename: 'Prescription-${prescription.id}.pdf',
                        content: fs.createReadStream(filePath)
                    }
                ]
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}

module.exports = {
    emailPrescriptionAsPdf,
};