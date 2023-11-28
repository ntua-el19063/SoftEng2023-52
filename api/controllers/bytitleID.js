const express = require('express')
const connection = require('../connection')

const bytitleID = (req, res)=>{
    const titleID = req.params.titleID
    let response = {}

    const executeQuery = (query) =>{
        return new Promise((resolve, reject) => {
            connection.query(query, (err, res) => {
                if(err) reject(err)
                else{resolve(res)}
            })
        })
    }

    const first_query = `select * from title_basics where tconst = '${titleID}'`
    const second_query = `select * from title_akas where titleId = '${titleID}'`
    const third_query = `select n.nconst, n.primaryName, p.category from title_principals p join name_basics n on p.nconst = n.nconst where p.tconst = '${titleID}'`
    const fourth_query = `select * from title_ratings where tconst='${titleID}'`
    Promise.all([executeQuery(first_query), executeQuery(second_query), executeQuery(third_query), executeQuery(fourth_query)])
        .then(([q1, q2, q3, q4]) => {
            response = { 
                titleID:q1[0].tconst,
                type: q1[0].titleType,
                originalTitle: q1[0].originalTitle,
                titlePoster: q1[0].imageURL,
                startYear: q1[0].startYear,
                endYear: q1[0].endYear,
                genres: q1[0].genres.split(',').map((genre)=>({genreTitle :genre})),
                titleAkas: q2.map((object) =>({akaTitle : object.title, regionAbbrev : object.region})),
                principals: q3.map((object) => ({nameID: object.nconst, name: object.primaryName, category: object.category})),
                rating: {avRating: q4[0].averageRating, nVotes: q4[0].numVotes}
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

module.exports = bytitleID