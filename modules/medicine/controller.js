const MedicineModel = require('./model');

async function addMedicine(req, res) {
    try {
        let medicine = await MedicineModel.addMedicine(req.body);

        res.status(200).json({
            status: true,
            medicine
        });
    } catch (error) {
        console.log('MedicineController.addMedicine.error: ', error);
        res.status(error.status_code ?? 500).json({
            status: false,
            message: error.message ?? 'Something went wrong'
        });
    }
}

async function getMedicine(req, res) {
    try {
        let medicine = await MedicineModel.getMedicine(req.body.id);

        if (medicine) {
            res.status(200).json({
                status: true,
                medicine
            });
        } else {
            res.status(404).json({
                status: false,
                message: 'No medicine found'
            });
        }
    } catch (error) {
        console.log('MedicineController.getMedicine.error: ', error);
        res.status(error.status_code ?? 500).json({
            status: false,
            message: error.message ?? 'Something went wrong'
        });
    }
}

async function getMedicines(req, res) {
    try {
        let medicines = await MedicineModel.getMedicines(req.body);

        if(medicines.length > 0) {
            res.status(200).json({
                status: true,
                medicines
            });
        } else {
            res.status(204).json({
                status: true,
                message: 'No medicines found',
                medicines
            });
        }
    } catch (error) {
        console.log('MedicineController.getMedicines.error: ', error);
        res.status(error.status_code ?? 500).json({
            status: false,
            message: error.message ?? 'Something went wrong',
        });
    }
}


module.exports = {
    addMedicine,
    getMedicine,
    getMedicines
};