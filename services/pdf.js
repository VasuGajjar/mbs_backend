const PDFDocument = require('pdfkit');
const fs = require('fs');
const { STORAGE_PATH } = require('../common/const');

function createPrescriptionPDF(prescription) {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument();
        const path = `${STORAGE_PATH}Prescription-${prescription.id}.pdf`;
        const writeStream = fs.createWriteStream(path);

        writeStream.on('finish', () => resolve(path));
        doc.pipe(writeStream);

        doc.fontSize(20).text(`Prescription #${prescription.id}`, 50, 50);

        doc.fontSize(14).text('Doctor Information', 50, 100);
        doc.fontSize(12).text(`${prescription.doctor.first_name} ${prescription.doctor.last_name}`, 50, 125);
        doc.fontSize(10).text(prescription.doctor.email, 50, 150);
        doc.fontSize(10).text(prescription.doctor.phone, 50, 170);
        doc.fontSize(10).text(prescription.doctor.specialization, 50, 190);

        doc.fontSize(14).text('Patient Information', 50, 230);
        doc.fontSize(12).text(`${prescription.patient.first_name} ${prescription.patient.last_name}`, 50, 255);
        doc.fontSize(10).text(prescription.patient.email, 50, 280);
        doc.fontSize(10).text(prescription.patient.phone, 50, 300);

        doc.fontSize(14).text('Prescription Information', 50, 340);
        doc.fontSize(12).text(`Description: ${prescription.description}`, 50, 365);
        doc.fontSize(12).text(`Date: ${new Date(prescription.time).toLocaleString()}`, 50, 385);

        doc.fontSize(14).text('Medication Information', 50, 430);
        let y = 460;
        prescription.medications.forEach((medication) => {
            doc.fontSize(12).text(`Name: ${medication.medicine.name}`, 50, y);
            doc.fontSize(12).text(`Dosage: ${medication.dosage}`, 50, y + 20);
            doc.fontSize(12).text(`Quantity: ${medication.quantity}`, 350, y + 20);
            doc.fontSize(12).text(`Start Date: ${new Date(medication.start_date).toLocaleString()}`, 50, y + 40);
            doc.fontSize(12).text(`End Date: ${new Date(medication.end_date).toLocaleString()}`, 350, y + 40);
            doc.fontSize(12).text(`Refill Information: ${medication.refill_information}`, 50, y + 60);
            y += 90;
        });

        doc.end();
    });
}

module.exports = {
    createPrescriptionPDF,
};
