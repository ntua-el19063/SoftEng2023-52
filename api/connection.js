const express = require('express');
const mysql2 = require('mysql2');

const connection = mysql2.createConnection({
    host: "localhost",
    database: "ntuaflix",
    user: "root",
    password : "",
    port: '3307'
})

module.exports = connection
