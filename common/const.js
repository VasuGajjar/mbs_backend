const UserType = {
    doctor: 'doctor',
    pharmacy: 'pharmacy',
}

const GenderType = {
    male: 'M',
    female: 'F',
    other: 'O',
}

const MedicineType = {
    tablet: 'tablet',
    capsule: 'capsule',
    injection: 'injection',
    syrup: 'syrup',
    cream: 'cream',
    ointment: 'ointment',
    inhaler: 'inhaler',
    drops: 'drops',
    powder: 'powder',
    gel: 'gel',
    spray: 'spray'
}

const DatabaseTables = {
    doctor: 'doctor',
    pharmacy: 'pharmacy',
    patient: 'patient',
    medicine: 'medicine',
    prescription: 'prescription',
    medication: 'medication',
    loginUser: 'login_user',
};

const STORAGE_PATH = process.env.STORAGE_PATH;

module.exports = {
    UserType,
    DatabaseTables,
    GenderType,
    STORAGE_PATH
}