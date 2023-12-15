const express = require('express');
const connection = require('../connection')
const stringSimilarity = require('string-similarity');
const natural = require('natural');

//this controller handles the base_url/filters request. We have to pass a json object as request body.
//This object can contain key value pairs for filtering the movies returned at result.
//The request can contain no body or a body with some of the available filters and still work just for these.
const searchMovies = (req, res) => {
    const searchText = req.body.searchText;
    const minYear = req.body.minYear;
    const maxYear = req.body.maxYear;
    const genre = req.body.genre;
    const minRuntimeMinutes = req.body.minRuntimeMinutes
    const maxRuntimeMinutes = req.body.maxRuntimeMinutes
    const titleType = req.body.titleType

    const sql_query = `SELECT * FROM title_basics`;

    connection.query(sql_query, (err, result) => {
        if (err) {
            console.error('SQL Error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if(searchText){
            // Calculate similarity scores using string-similarity library and sort the result array
            const moviesWithScores = result.map(movie => ({
                ...movie,
                similarityScore: natural.JaroWinklerDistance(searchText.toLowerCase(), movie.primaryTitle.toLowerCase()),
            }));

            result = moviesWithScores.sort((a, b) => b.similarityScore - a.similarityScore);
        }
        if(minYear){
            result = result.filter(movie => movie.startYear>=minYear)
        }
        if(maxYear){
            result = result.filter(movie => movie.startYear<=maxYear)
        }
        if(genre){
            result = result.filter(movie => movie.genres && movie.genres.split(',').find(moviegenres => moviegenres==genre))
        }
        if(minRuntimeMinutes){
            result = result.filter(movie => movie.runtimeMinutes >= minRuntimeMinutes)
        }
        if(maxRuntimeMinutes){
            result = result.filter(movie => movie.runtimeMinutes <= maxRuntimeMinutes)
        }
        if(titleType){
            result = result.filter(movie => movie.titleType == titleType)
        }
<<<<<<< HEAD
        if (result.length==0)return res.status(204).send({message : "No films match your filters"})
=======
        
>>>>>>> 47ab34b23087ebab625e81cfcbf0ec583f3ba05b
        return res.status(200).send(result);
    });
}

module.exports = searchMovies
