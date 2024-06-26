const { Op } = require("sequelize")
const M_Mata_Pelajaran = require("../model/M_Mata_Pelajaran")

exports.F_Mata_Pelajaran_getAll = async (parameter) => {
    try {
        const data = await M_Mata_Pelajaran.findAll({
            where: parameter,
            raw: true
        })

        return {
            success: true,
            data
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}

exports.F_Mata_Pelajaran_create = async (payload) => {
    try {
        if(Array.isArray(payload)) {
            await M_Mata_Pelajaran.bulkCreate(payload)
        }else{
            await M_Mata_Pelajaran.create(payload)
        }

        return {
            success: true
        }
    } catch (error) {
        console.log(error.message)
        return {
            success: false,
            message: error.message
        }
    }
}

exports.F_Mata_Pelajaran_update = async (id_mapel, payload) => {
    try {
        if(Array.isArray(id_mapel)) {
            await M_Mata_Pelajaran.update(payload, {
                where: {
                    id_mapel: {
                        [Op.in]: id_mapel
                    }
                }
            })
        }else{
            await M_Mata_Pelajaran.update(payload, {
                where: {
                    id_mapel
                }
            })
        }

        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}

exports.F_Mata_Pelajaran_delete = async (id_mapel) => {
    try {
        if(Array.isArray(id_mapel)) {
            await M_Mata_Pelajaran.destroy({
                where: {
                    id_mapel: {
                        [Op.in]: id_mapel
                    }
                }
            })
        }else{
            await M_Mata_Pelajaran.destroy({
                where: {
                    id_mapel
                }
            })
        }

        return {
            success: true
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}