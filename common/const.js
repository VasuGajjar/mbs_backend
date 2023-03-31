const UserType = {
    doctor: 'doctor',
    pharmacy: 'pharmacy',
}

const GenderType = {
    male: 'm',
    female: 'f',
    other: 'o',
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

module.exports = {
    UserType,
    DatabaseTables,
    GenderType,
}