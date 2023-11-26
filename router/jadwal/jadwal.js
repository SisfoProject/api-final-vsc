const express = require('express')
const jadwal = express.Router()
const db = require('../../lib/mysql')


// jadwal.get('/jadwal', (req, res) => {
//     res.send('')
// })

jadwal.get('/jadwal/:hari/:kelas', (req, res) => {
    const { kelas, hari } = req.params
    const q = `SELECT * FROM v_jadwal WHERE kelas = '${kelas}' AND hari = '${hari}' order by jam`
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } 
        else if (result.length === 0) {
            res.status(200).send('tidak ada jadwal')
        }
        else {
            res.status(200).send(result)
        }
    })
})

jadwal.get('/all-jadwal', (req, res) => {
    const q = `SELECT * FROM v_jadwal`
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } 
        else if (result.length === 0) {
            res.status(200).send('tidak ada jadwal')
        }
        else {
            res.status(200).send(result)
        }
    })
})

jadwal.get('/all-jadwal-dosen/:noHp', (req, res) => {
    const { noHp } = req.params
    const q = `SELECT * FROM v_jadwal where no_hp = ${noHp}`
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } 
        else if (result.length === 0) {
            res.status(200).send('tidak ada jadwal')
        }
        else {
            res.status(200).send(result)
        }
    })
})

jadwal.get('/all-jadwal-dosen/:hari/:noHp', (req, res) => {
    const { hari, noHp } = req.params
    const q = `SELECT * FROM v_jadwal where no_hp = ${noHp} and hari = ${hari}`
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } 
        else if (result.length === 0) {
            res.status(200).send('tidak ada jadwal')
        }
        else {
            res.status(200).send(result)
        }
    })
})

jadwal.get('/all-jadwal/:kelas', (req, res) => {
    const { kelas } = req.params
    const q = `SELECT * FROM v_jadwal WHERE kelas = '${kelas}' order by hari `
    db.query(q, (err, result) => {
        if (err) {
            res.status(500).send(err)
        } 
        else if (result.length === 0) {
            res.status(200).send('tidak ada jadwal')
        }
        else {
            res.status(200).send(result)
        }
    })
})

jadwal.put('/update-jadwal/:id', (req, res) => {
    const { id } = req.params
    const {hari, jam} = req.body
    const q = 'UPDATE jadwal SET jam = ?, hari = ? WHERE id = ?'
    db.query(q, [jam, hari, id], (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(result)
        }
    })
})

jadwal.get('/get-jadwal/:id', (req, res) => {
    const { id } = req.params
    const q = 'select * from v_jadwal where id = ?'
    db.query(q, [id], (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(result)
        }
    })
})


jadwal.put('/update-status-jadwal/:id', (req, res) => {
    const {id} = req.params
    const {keterangan,note,kelas} = req.body
    console.log(keterangan,note,kelas,id)
    const q = 'UPDATE jadwal SET keterangan = ?, note = ? WHERE kode_jadwal = ? and kelas = ?'
    db.query(q, [keterangan,note,id,kelas], (err, result) => {
        if (err) {
            res.status(500).send(err)
        }
        else {
            res.status(200).send(result)
        }
    })
})




module.exports = jadwal