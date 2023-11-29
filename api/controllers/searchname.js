const express = require('express');
const connection = require('../connection');

const searchname = async (req, res) => {
    const titlePart = req.body.namePart;

    try {
        const result = await executeQuery(`SELECT * FROM name_basics WHERE primaryName LIKE '%${namePart}%'`);

        if (result.length > 0) {
            const nameID = result[0].tconst;
            const [q1, q2] = await Promise.all([
                executeQuery(`select nb.nconst, nb.primaryName, nb.imageURL, nb.birthYear, nb.deathYear, nb.primaryProfession from name_basics nb where nconst = '${nameID}'`),
                executeQuery(`select tp.tconst, tp.category from title_principals tp where nconst = '${nameID}'`)                
            ]);

            const response = { 
              nameID:q1[0].nb.nconst,
              name: q1[0].nb.primaryName,
              namePoster: q1[0].nb.imageURL,
              birthYr: q1[0].nb.birthYear,
              deathYr: q1[0].nb.deathYr,
              profession: q1[0].nb.primaryProfession,
              nameTitles: q2.map((object) => ({
                titleID: object.tconst,
                category: object.category
            }))
              
          };

            res.status(200).json(response);
        } else {
            res.status(404).json({
                status: 'Not Found',
                message: 'Name not found'
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

module.exports = searchname;
