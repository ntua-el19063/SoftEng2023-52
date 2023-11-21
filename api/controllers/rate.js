const express = require('express');
const connection = require('../connection')

const like = (req,res)=>{
    const { userId, movieId } = req.params;

    if (!userId || !movieId) {
        return res.status(400).json({ error: 'userId and movieId are required in the URL' });
    }

    const sql_query = `insert into like_movie (userId, movieId) values(${userId}, '${movieId}')`
    
    try{
        connection.query(sql_query, (err,result)=>{
            if(err) {
                //handle error without crashing
                console.error('SQL EROOR', err)
                return res.status(500).json({ error: 'Internal Server Error' })
            }
            return res.status(200).json({success:true, action:'like_movie'});
        })
    }
    catch(error){
        //handle error without crashing
        console.error('Unexpected Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

const dislike = (req,res)=>{
    const { userId, movieId } = req.params;

    if (!userId || !movieId) {
        return res.status(400).json({ error: 'userId and movieId are required in the URL' });
    }

    const sql_query = `insert into dislike_movie (userId, movieId) values(${userId}, '${movieId}')`

    try{
        connection.query(sql_query, (err,result)=>{
            if(err) {
                //handle error without crashing
                console.error('SQL EROOR', err)
                return res.status(500).json({ error: 'Internal Server Error' })
            }
            return res.status(200).json({success:true, action:'dislike_movie'});
        })
    }
    catch(error){
        //handle error without crashing
        console.error('Unexpected Error:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {like, dislike}