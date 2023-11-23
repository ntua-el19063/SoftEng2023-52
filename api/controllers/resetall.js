const connection = require('../connection');
const express = require('express');
const fs = require('fs');

const myfile = fs.readFileSync('./ntuaflix_backup2.sql', 'utf-8');

const resetall = (req, res) => {
    const sql_query = myfile
    .replace(/\r\n/g, ' ');

    connection.query(sql_query, (err, result) => {
        if (err) throw err;
        else res.status(200).json({ status: 'OK' });
    });
};
module.exports = resetall;
