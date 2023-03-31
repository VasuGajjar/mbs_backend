const PrescriptionModel = require('./model');

async function addPrescription(req, res) {
    try {
        let { prescription, medications } = req.body;

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
            res.status(200).json({
                status: true,
                prescription
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
    getPrescriptions,
    addMedication,
    getMedication
};