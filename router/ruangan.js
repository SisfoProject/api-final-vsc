const express = require('express')
const ruangan = express.Router()
const db = require('../lib/mysql')

ruangan.get('/ruangan', (req, res) => {
  const {hari,jam} = req.body
  const q = `
  SELECT DISTINCT
    nama_ruangan,
    nama_gedung,
    'available' AS status
  FROM
    v_ruang
  WHERE
    (
      ('${jam}' < awal OR '${jam}' > akhir)
      AND '${hari}' = hari
    )
    OR (
      '${hari}' != hari
      AND nama_gedung = 'Sains dan Teknologi B'
      AND nama_ruangan != 'ICT L2'

    ) 
    Or (
      hari is null 
    )
`;


  db.query(q, (err, result) => {
    if (err) {
      res.status(500).send(err)
    } 
    else if (result.length === 0) {
      res.status(200).send('tidak ada ruangan')
    }
    else {
      res.status(200).send(result)
    }
  })


})


module.exports = ruangan