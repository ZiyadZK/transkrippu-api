const { DataTypes } = require("sequelize");
const db = require("../config");

const M_Akun = db.define('data_akun', {
    id_akun: {
        type: DataTypes.INTEGER(3),
        primaryKey: true,
        autoIncrement: true
    },
    id_pegawai_akun: {
        type: DataTypes.STRING(3),
        unique: 'id_pegawai_akun',
        allowNull: true
    },
    nama_akun: {
        type: DataTypes.STRING(75),
        allowNull: true
    },
    email_akun: {
        type: DataTypes.STRING(75),
        allowNull: true,
        unique: 'email_akun'
    },
    password_akun: {
        type: DataTypes.STRING(75),
        allowNull: true
    },
    role_akun: {
        type: DataTypes.STRING(30),
        allowNull: true
    }
})

M_Akun.sync()

module.exports = M_Akun