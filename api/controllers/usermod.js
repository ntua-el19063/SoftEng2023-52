const express = require('express');
const connection = require('../connection');

const usermod = (req, res) => {
    const sql_query = "INSERT INTO users (username, password) VALUES (?, ?) ON DUPLICATE KEY UPDATE password = ?";

    const { username, password } = req.params;

    connection.query(sql_query, [username, password, password], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
};

module.exports = usermod;
