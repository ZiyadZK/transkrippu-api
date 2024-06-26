const express = require('express')
const { F_Akun_getAll, F_Akun_create, F_Akun_update, F_Akun_delete, F_Akun_get } = require('../database/function/F_Akun')
const { validateBody } = require('../middleware')
const { decryptData, encryptData } = require('../libs/crypto')
const { F_Mata_Pelajaran_getAll, F_Mata_Pelajaran_create, F_Mata_Pelajaran_update, F_Mata_Pelajaran_delete } = require('../database/function/F_Mata_Pelajaran')

const route_v1 = express.Router()

.get('/', (req, res) => {
    return res.status(200).json({
        message: 'SI Transkrip API is Connected!'
    })
})

.get('/v1', (req, res) => {
    return res.status(200).json({
        message: 'SI Transkrip API v1 is Connected!'
    })
})

.get('/v1/data', (req, res) => {
    return res.status(200).json({
        message: 'SI Transkrip API of Data v1 is Connected!'
    })
})

// DATA AKUN
.get('/v1/userdata/:email/:password', async (req, res) => {
    try {
        const email_akun = req.params.email
        const password_akun = req.params.password
        const response = await F_Akun_get({
            email_akun, password_akun
        })

        if(response.success) {
            if(response.data !== null) {
                const token = await encryptData(response.data)
                return res.status(200).json({
                    data: token
                })
            }else{
                return res.status(400).json({
                    message: 'Email / Password tidak ditemukan!'
                })
            }
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
            tipe: 'DATABASE ERROR'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})
.get('/v1/data/akun', async (req, res) => {
    try {
        const response = await F_Akun_getAll()
        if(response.success) {
            return res.status(200).json({
                data: response.data
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
            tipe: 'DATABASE ERROR'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

.post('/v1/data/akun', validateBody, async(req, res) => {
    try {
        const payload = await req.body
        const response = await F_Akun_create(payload)
        if(response.success) {
            return res.status(200).json({
                message: 'Berhasil menambahkan data ke dalam Data Akun'
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
            tipe: 'DATABASE ERROR'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

.put('/v1/data/akun', validateBody, async (req, res) => {
    try {
        const payload = await req.body.payload
        const id_akun = await req.body.id_akun

        const response = await F_Akun_update(id_akun, payload)
        if(response.success) {
            return res.status(200).json({
                message: 'Berhasil mengubah akun dari data akun'
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
            tipe: 'DATABASE ERROR'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

.delete('/v1/data/akun', validateBody, async (req, res) => {
    try {
        const id_akun = await req.body.id_akun

        const response = await F_Akun_delete(id_akun)
        if(response.success) {
            return res.status(200).json({
                message: 'Berhasil menghapus akun dari data akun'
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
            tipe: 'DATABASE ERROR'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

// MATA PELAJARAN
.get('/v1/data/mapel', async (req, res) => {
    try {

        const filters = req.query.filters
        let response

        if(!filters) {
            response = await F_Mata_Pelajaran_getAll()
        }else{
            response = await F_Mata_Pelajaran_getAll(filters)
        }
        if(response.success) {
            return res.status(200).json({
                filters,
                data: response.data,
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
            tipe: 'DATABASE ERROR'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

.post('/v1/data/mapel', validateBody, async (req, res) => {
    try {

        const payload = await req.body

        const response = await F_Mata_Pelajaran_create(payload)
        if(response.success) {
            return res.status(200).json({
                message: 'Berhasil membuat data baru untuk Data Mata Pelajaran'
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
            tipe: 'DATABASE ERROR'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

.put('/v1/data/mapel', validateBody, async (req, res) => {
    try {

        const payload = await req.body.payload
        const id_mapel = await req.body.id_mapel

        const response = await F_Mata_Pelajaran_update(id_mapel, payload)
        if(response.success) {
            return res.status(200).json({
                message: 'Berhasil mengubah data dari Data Mata Pelajaran'
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
            tipe: 'DATABASE ERROR'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

.delete('/v1/data/mapel', validateBody, async (req, res) => {
    try {
        const id_mapel = await req.body.id_mapel
        console.log(id_mapel)

        const response = await F_Mata_Pelajaran_delete(id_mapel)
        if(response.success) {
            return res.status(200).json({
                message: 'Berhasil menghapus data dari Data Mata Pelajaran'
            })
        }
        
        return res.status(400).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            error_message: response.message,
            tipe: 'DATABASE ERROR'
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Terdapat error saat memproses data, hubungi Administrator data',
            tipe: 'INTERNAL SERVER'
        })
    }
})

module.exports = route_v1