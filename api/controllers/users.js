const express = require('express');
const connection = require('../connection');

const users = (req, res) => {
    const sql_query = "select * from user where username = ?";

    const { username} = req.params;

    connection.query(sql_query, [username], (err, result) => {
        if (err) throw err;
        res.status(200).json(
            result
        );
    });
};

module.exports = users;