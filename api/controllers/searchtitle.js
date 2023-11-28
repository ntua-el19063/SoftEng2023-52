const express = require('express');
const connection = require('../connection');

const searchTitle = async (req, res) => {
    const titlePart = req.body.titlePart;

    try {
        const result = await executeQuery(`SELECT * FROM title_basics WHERE originalTitle LIKE '%${titlePart}%'`);

        if (result.length > 0) {
            const titleID = result[0].tconst;
            const [q1, q2, q3, q4] = await Promise.all([
                executeQuery(`SELECT * FROM title_basics WHERE tconst = '${titleID}'`),
                executeQuery(`SELECT * FROM title_akas WHERE titleId = '${titleID}'`),
                executeQuery(`SELECT n.nconst, n.primaryName, p.category FROM title_principals p JOIN name_basics n ON p.nconst = n.nconst WHERE p.tconst = '${titleID}'`),
                executeQuery(`SELECT * FROM title_ratings WHERE tconst='${titleID}'`),
            ]);

            const response = {
                titleID: q1[0].tconst,
                type: q1[0].titleType,
                originalTitle: q1[0].originalTitle,
                titlePoster: q1[0].imageURL,
                startYear: q1[0].startYear,
                endYear: q1[0].endYear,
                genres: q1[0].genres.split(',').map((genre) => ({ genreTitle: genre })),
                titleAkas: q2.map((object) => ({ akaTitle: object.title, regionAbbrev: object.region })),
                principals: q3.map((object) => ({ nameID: object.nconst, name: object.primaryName, category: object.category })),
                rating: { avRating: q4[0].averageRating, nVotes: q4[0].numVotes }
            };

            res.status(200).json(response);
        } else {
            res.status(404).json({
                status: 'Not Found',
                message: 'Title not found'
            });
        }
    } catch (err) {
        res.status(500).json({
            status: 'Failed',
            message: err.message
        });
    }
};

const executeQuery = (query) => {
    return new Promise((resolve, reject) => {
        connection.query(query, (err, res) => {
            if (err) {
                reject(err);
            } else {
                resolve(res);
            }
        });
    });
};

module.exports = searchTitle;
