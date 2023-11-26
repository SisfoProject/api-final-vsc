
const express = require('express');
const forget = express.Router();
const db = require('../lib/mysql.js');

forget.post('/forget', (req, res) => {
  const { username, email, oldPassword, newPassword, noHp, npm } = req.body;

  const q = 'INSERT INTO lupa_password VALUES (?, ?, ?, ?, ?, ?)';
  const values = [username, email, oldPassword, newPassword, noHp, npm];

  db.query(q, values, (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send(err);
    } else {
      res.status(200).send(result);
    }
  });
});

module.exports = forget;


module.exports = forget