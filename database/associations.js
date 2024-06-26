const M_Mata_Pelajaran = require("./model/M_Mata_Pelajaran");
const M_Nilai = require("./model/M_Nilai");

M_Mata_Pelajaran.hasMany(M_Nilai, { foreignKey: 'fk_id_mapel', onDelete: 'CASCADE' })
M_Nilai.belongsTo(M_Mata_Pelajaran, { foreignKey: 'fk_id_mapel', onDelete: 'CASCADE' })

(async () => {
    await db.sync()

    console.log('Database & tables synced!')
})();