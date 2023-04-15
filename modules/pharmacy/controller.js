const PharmacyModel = require('./model');
const PrescriptionModel = require('../prescription/model');

async function addMedicineStock(req, res) {
    try {
        let { pharmacy_id, medicine_id } = req.body;
        let result = await PharmacyModel.setQuantityPrice(pharmacy_id, medicine_id, 0, 0);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Success',
                data: result,
            });
        } else {
            res.status(405).json({
                status: false,
                message: 'Unable to update'
            });
        }
    } catch (error) {
        console.log('PharmacyController.addMedicineStock.error: ', error);
        res.status(error.status_code ?? 500).json({
            status: false,
            message: error.message ?? 'Something went wrong'
        });
    }
}

async function updateMedicineStock(req, res) {
    try {
        let { id, quantity, price } = req.body;
        let result = await PharmacyModel.updateQuantityPrice(id, quantity, price);
        if (result) {
            res.status(200).json({
                status: true,
                message: 'Success',
                data: result,
            });
        } else {
            res.status(405).json({
                status: false,
                message: 'Unable to update'
            });
        }
    } catch (error) {
        console.log('PharmacyController.updateMedicineStock.error: ', error);
        res.status(error.status_code ?? 500).json({
            status: false,
            message: error.message ?? 'Something went wrong'
        });
    }
}

async function getStockList(req, res) {
    try {
        let result = await PharmacyModel.getMedicineQuantityPrice(req.query.pharmacy_id);
        if (!result.isEmpty) {
            res.status(200).json({
                status: true,
                message: 'Success',
                data: result,
            });
        } else {
            res.status(204).json({
                status: false,
                message: 'No records found',
            });
        }
    } catch (error) {
        console.log('PharmacyController.getStockList.error: ', error);
        res.status(error.status_code ?? 500).json({
            status: false,
            message: error.message ?? 'Something went wrong'
        });
    }
}

async function checkPrescription(req, res) {
    try {
        let { pharmacy_id, prescription_id } = req.body;
        let medications = await PrescriptionModel.getMedications(prescription_id);
        if (medications && !medications.isEmpty) {
            let medicine_list = [];
            let grand_total = 0;
            for (let medication of medications) {
                let stockDetails = await PharmacyModel.getMedicineQuantityPrice(pharmacy_id, medication.medicine_id);
                if (stockDetails && !stockDetails.isEmpty && stockDetails.first.quantity >= medication.quantity) {
                    stockDetails = stockDetails.first;
                    medicine_list.push({
                        stock_id: stockDetails.id,
                        medicine_id: medication.medicine_id,
                        medication_id: medication.id,
                        name: stockDetails.name,
                        description: stockDetails.description,
                        required_quantity: medication.quantity,
                        available_quantity: stockDetails.quantity,
                        price: stockDetails.price,
                        total_price: medication.quantity * stockDetails.price,
                    });
                    grand_total += (medication.quantity * stockDetails.price);
                } else {
                    return res.status(400).json({
                        status: false,
                        message: 'Stock not available',
                    });
                }
            }
            console.log(medicine_list);
            res.status(200).json({
                status: true,
                data: {
                    grand_total,
                    medicine_list
                }
            });
        } else {
            res.status(405).json({
                status: false,
                message: 'No Medication found given prescription',
            });
        }
    } catch (error) {
        console.log('PharmacyController.checkPrescription.error: ', error);
        res.status(error.status_code ?? 500).json({
            status: false,
            message: error.message ?? 'Something went wrong'
        });
    }
}

module.exports = {
    addMedicineStock,
    updateMedicineStock,
    getStockList,
    checkPrescription,
};