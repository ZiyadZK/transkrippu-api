const { Op } = require("sequelize")
const M_Mata_Pelajaran = require("../model/M_Mata_Pelajaran")
const M_Nilai = require("../model/M_Nilai")

exports.F_Nilai_getAll = async () => {
    try {
        const data = await M_Nilai.findAll({
            raw: true,
            include: [
                {
                    model: M_Mata_Pelajaran,
                    as: 'data_mapel',
                    where: {
                        aktif: true,
                        is_mapel: true
                    }
                }
            ]
        })

        const formattedData = data.map(value => ({
            id_nilai: value['id_nilai'],
            fk_id_mapel: value['fk_id_mapel'],
            nama_mapel: value['data_mapel.nama_mapel'],
            jurusan_mapel: value['data_mapel.jurusan_mapel'],
            kategori_mapel: value['data_mapel.kategori_mapel'],
            nis: value['nis'],
            semester_1: value['semester_1'],
            semester_2: value['semester_2'],
            semester_3: value['semester_3'],
            semester_4: value['semester_4'],
            semester_5: value['semester_5'],
            semester_6: value['semester_6'],
            nilai_akhir: value['nilai_akhir'],
            nilai_ujian: value['nilai_ujian'],
        }))

        return {
            success: true,
            data: formattedData
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}

exports.F_Nilai_get = async (nis) => {
    try {
        const data = await M_Nilai.findAll({
            where: {
                nis
            },
            raw: true,
            include: [
                {
                    model: M_Mata_Pelajaran,
                    as: 'data_mapel',
                    where: {
                        aktif: true,
                        is_mapel: true
                    }
                }
            ]
        })

        const formattedData = data.map(value => ({
            id_nilai: value['id_nilai'],
            fk_id_mapel: value['fk_id_mapel'],
            nama_mapel: value['data_mapel.nama_mapel'],
            jurusan_mapel: value['data_mapel.jurusan_mapel'],
            kategori_mapel: value['data_mapel.kategori_mapel'],
            nis: value['nis'],
            semester_1: value['semester_1'],
            semester_2: value['semester_2'],
            semester_3: value['semester_3'],
            semester_4: value['semester_4'],
            semester_5: value['semester_5'],
            semester_6: value['semester_6'],
            nilai_akhir: value['nilai_akhir'],
            nilai_ujian: value['nilai_ujian'],
        }))

        return {
            success: true,
            data: formattedData
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: error.message
        }
    }
}

exports.F_Nilai_create = async (payload) => {
    try {
        if(Array.isArray(payload)) {
            await M_Nilai.bulkCreate(payload)
        }else{
            await M_Nilai.create(payload)
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

exports.F_Nilai_update = async (id_nilai, payload) => {
    try {
        if(Array.isArray(id_nilai)) {
            await M_Nilai.update(payload, {
                where: {
                    id_nilai: {
                        [Op.in]: id_nilai
                    }
                }
            })
        }else{
            await M_Nilai.update(payload, {
                where: {
                    id_nilai
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

exports.F_Nilai_delete = async (id_nilai) => {
    try {
        if(Array.isArray(id_nilai)) {
            await M_Nilai.destroy({
                where: {
                    id_nilai: {
                        [Op.in]: id_nilai
                    }
                }
            })
        }else{
            await M_Nilai.destroy({
                where: {
                    id_nilai
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