const express = require('express');
const connection = require('../connection');

const usermod = (req, res) => {
    const sql_query = "INSERT INTO user (username, pwd) VALUES (?, ?) ON DUPLICATE KEY UPDATE pwd = ?";

    const { username, password } = req.params;

    connection.query(sql_query, [username, password, password], (err, result) => {
        if (err) throw err;
        res.status(200).send({
            status: 'OK',
            message: 'User inserted/updated successfully'
        }
        );
    });
};

module.exports = usermod;
