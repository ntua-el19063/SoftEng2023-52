const express = require('express');
const connection = require('../connection')
const stringSimilarity = require('string-similarity');
const natural = require('natural');


const searchMovies = (req, res) => {
    const searchText = req.params.searchText;

    if (!searchText) {
        return res.status(400).json({ error: 'Search text is required in the URL' });
    }

    const sql_query = `SELECT * FROM movie`;

    connection.query(sql_query, (err, result) => {
        if (err) {
            console.error('SQL Error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        // Calculate similarity scores using string-similarity library and sort the result array
        const moviesWithScores = result.map(movie => ({
            ...movie,
            similarityScore: natural.JaroWinklerDistance(searchText.toLowerCase(), movie.primaryTitle.toLowerCase()),
        }));

        const sortedMovies = moviesWithScores.sort((a, b) => b.similarityScore - a.similarityScore);

        return res.status(200).json({ success: true, movies: sortedMovies });
    });
};

module.exports = searchMovies