const { DataTypes } = require("sequelize");
const db = require("../config");
const M_Mata_Pelajaran = require("./M_Mata_Pelajaran");

const M_Nilai = db.define('data_nilai', {
    id_nilai: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        primaryKey: true
    },
    fk_id_mapel: {
        type: DataTypes.INTEGER(10),
        allowNull: false
    },
    nis: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    semester: {
        type: DataTypes.STRING(2),
        allowNull: false
    },
    nilai_akhir: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
}, {
    tableName: 'data_nilai'
})

module.exports = M_Nilai