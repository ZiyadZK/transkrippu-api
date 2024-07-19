const { DataTypes } = require("sequelize");
const db = require("../config");
const M_Mata_Pelajaran = require("./M_Mata_Pelajaran");

const M_Nilai = db.define('data_nilai', {
    id_nilai: {
        type: DataTypes.INTEGER(11),
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    fk_id_mapel: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        references: {
            model: 'data_mapel',
            key: 'id_mapel'
        }
    },
    nis: {
        type: DataTypes.STRING(10),
        allowNull: false
    },
    semester_1: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    semester_2: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    semester_3: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    semester_4: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    semester_5: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    semester_6: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    nilai_akhir: {
        type: DataTypes.STRING(5),
        allowNull: true
    },
    nilai_ujian: {
        type: DataTypes.STRING(5),
        allowNull: true
    }
}, {
    tableName: 'data_nilai'
})

module.exports = M_Nilai