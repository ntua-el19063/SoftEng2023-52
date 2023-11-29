const express = require('express')
const connection = require('../connection')

const bynameID = (req, res)=>{
    const nameID = req.params.nameID
    let response = {}

    const executeQuery = (query) =>{
        return new Promise((resolve, reject) => {
            connection.query(query, (err, res) => {
                if(err) reject(err)
                else{resolve(res)}
            })
        })
    }

    const first_query = `select nb.nconst, nb.primaryName, nb.imageURL, nb.birthYear, nb.deathYear, nb.primaryProfession from name_basics nb where nconst = '${nameID}'`
    const second_query = `select tp.tconst, tp.category from title_principals tp where nconst = '${nameID}'`
    
    Promise.all([executeQuery(first_query), executeQuery(second_query)])
        .then(([q1, q2]) => {
            response = { 
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
                
            }
            res.status(200).json(response)
        })
        .catch((err) => {
            res.status(500).json({
                status: 'Failed',
                message: err.message
            }
            )}
        )
}

module.exports = bynameID