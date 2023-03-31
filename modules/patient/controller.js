const PatientModel = require('./model');

async function addPatient(req, res) {
    try {
        let patient = await PatientModel.addPatient(req.body);

        res.status(200).json({
            status: true,
            patient
        });
    } catch (error) {
        console.log('PatientController.addPatient.error: ', error);
        res.status(error.status_code ?? 500).json({
            status: false,
            message: error.message ?? 'Something went wrong'
        });
    }
}

async function getPatient(req, res) {
    try {
        let patient = await PatientModel.getPatient(req.params.id);

        res.status(200).json({
            status: true,
            patient
        });
    } catch (error) {
        console.log('PatientController.getPatient.error: ', error);
        res.status(error.status_code ?? 500).json({
            status: false,
            message: error.message ?? 'Something went wrong'
        });
    }
}


module.exports = {
    addPatient,
    getPatient
};