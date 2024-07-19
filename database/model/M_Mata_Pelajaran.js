const { DataTypes } = require("sequelize");
const db = require("../config");
const M_Nilai = require("./M_Nilai");

const M_Mata_Pelajaran = db.define('data_mapel', {
    id_mapel: {
        type: DataTypes.INTEGER(6),
        autoIncrement: true,
        primaryKey: true
    },
    jurusan_mapel: {
        type: DataTypes.STRING(6),
        allowNull: false
    },
    nama_mapel: {
        type: DataTypes.STRING,
        allowNull: true
    },
    kategori_mapel: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_parent: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    parent_from_id_mapel: {
        type: DataTypes.STRING,
        allowNull: true
    },
    is_mapel: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    aktif: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    timestamps: true,
    tableName: 'data_mapel'
})

M_Mata_Pelajaran.hasMany(M_Nilai, { foreignKey: 'fk_id_mapel', sourceKey: 'id_mapel', as: 'mata_pelajaran'})
M_Nilai.belongsTo(M_Mata_Pelajaran, { foreignKey: 'fk_id_mapel', targetKey: 'id_mapel'})

module.exports = M_Mata_Pelajaran