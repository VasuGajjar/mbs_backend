const PrescriptionModel = require('./model');
const PatientModel = require('../patient/model');
const DoctorModel = require('../doctor/model');
const MedicineModel = require('../medicine/model');

const PdfHelper = require('../../services/pdf');
const EmailHelper = require('../../services/email');

async function addPrescription(req, res) {
    try {
        let prescription = req.body.prescription;
        let medications = prescription.medications;

        let result = await PrescriptionModel.addPrescription(prescription);

        if (result?.id === null || result?.id === undefined) throw { status_code: 503, message: 'Unable to create prescription' };

        for (let medication of (medications ?? [])) {
            await PrescriptionModel.addMedication(result.id, medication);
        }

        res.status(200).json({
            status: true,
            prescription: result
        });
    } catch (error) {
        console.log('PrescriptionController.addPrescription.error: ', error);
        res.status(error.status_code ?? 500).json({
            status: false,
            message: error.message ?? 'Something went wrong'
        });
    }
}

async function getPrescription(req, res) {
    try {
        let prescription = await PrescriptionModel.getPrescription(req.params.id);

        if (prescription) {
            prescription.doctor = await DoctorModel.getDoctor(prescription.doctor_id, 'first_name, last_name, email, phone, specialization');
            prescription.patient = await PatientModel.getPatient(prescription.patient_id, 'first_name, last_name, email, phone')
            prescription.medications = await PrescriptionModel.getMedications(prescription.id);

            for (let medication of prescription.medications) {
                medication.medicine = await MedicineModel.getMedicine(medication.medicine_id, 'name, description, type, manufacturer');
            }

            if (req.headers.accept == 'application/json') {
                res.status(200).json({
                    status: true,
                    prescription
                });
            } else if (req.headers.accept == 'application/pdf') {
                res.status(200).sendFile(await PdfHelper.createPrescriptionPDF(prescription));
            } else {
                res.status(403).json({
                    status: false,
                    message: 'Invalid accept header'
                });
            }
        } else {
            throw { status_code: 404, message: 'No prescription found' };
        }
    } catch (error) {
        console.log('PrescriptionController.getPrescription.error: ', error);
        res.status(error.status_code ?? 500).json({
            status: false,
            message: error.message ?? 'Something went wrong'
        });
    }
}

async function emailPrescription(req, res) {
    try {
        let prescription = await PrescriptionModel.getPrescription(req.params.id);

        if (prescription) {
            prescription.doctor = await DoctorModel.getDoctor(prescription.doctor_id, 'first_name, last_name, email, phone, specialization');
            prescription.patient = await PatientModel.getPatient(prescription.patient_id, 'first_name, last_name, email, phone')
            prescription.medications = await PrescriptionModel.getMedications(prescription.id);

            for (let medication of prescription.medications) {
                medication.medicine = await MedicineModel.getMedicine(medication.medicine_id, 'name, description, type, manufacturer');
            }

            let info = await EmailHelper.emailPrescriptionAsPdf(prescription);
            console.log(info); //TODO remove this comment

            res.status(200).json({
                status: true,
                message: 'Email sent successfully'
            });
        } else {
            throw { status_code: 404, message: 'No prescription found' };
        }
    } catch (error) {
        console.log('PrescriptionController.getPrescription.error: ', error);
        res.status(error.status_code ?? 500).json({
            status: false,
            message: error.message ?? 'Something went wrong'
        });
    }
}

async function getPrescriptions(req, res) {
    try {
        let prescriptions = await PrescriptionModel.getPrescriptions(req.query);

        if (!prescriptions.isEmpty) {
            res.status(200).json({
                status: true,
                prescriptions
            });
        } else {
            throw { status_code: 204, message: 'No prescriptions found' };
        }
    } catch (error) {
        console.log('PrescriptionController.getPrescriptions.error: ', error);
        res.status(error.status_code ?? 500).json({
            status: false,
            message: error.message ?? 'Something went wrong'
        });
    }
}

async function addMedication(req, res) {
    try {
        let medication = await PrescriptionModel.addMedication(req.params.prescription_id, req.body);

        res.status(200).json({
            status: true,
            medication
        });
    } catch (error) {
        console.log('PrescriptionController.addMedication.error: ', error);
        res.status(error.status_code ?? 500).json({
            status: false,
            message: error.message ?? 'Something went wrong'
        });
    }
}

async function getMedication(req, res) {
    try {
        let medication = await PrescriptionModel.getMedication(req.params.prescription_id, req.params.medicine_id);

        if (medication) {
            res.status(200).json({
                status: true,
                medication
            });
        } else {
            throw { status_code: 404, message: 'No medication found' };
        }
    } catch (error) {
        console.log('PrescriptionController.getMedication.error: ', error);
        res.status(error.status_code ?? 500).json({
            status: false,
            message: error.message ?? 'Something went wrong'
        });
    }
}

module.exports = {
    addPrescription,
    getPrescription,
    emailPrescription,
    getPrescriptions,
    addMedication,
    getMedication
};