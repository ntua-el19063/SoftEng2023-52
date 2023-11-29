const express = require('express');
const cors = require('cors');
const home = require('./routes/home')
const admin = require ('./routes/admin')
const formatMiddleware = require('./controllers/formatMiddleware')
const https = require('https');
const fs = require('fs')

const port = 9876
const app = express();

app.use(cors())
app.use(express.json())
app.use(formatMiddleware)

app.use('/ntuaflix_api/admin', admin)
app.use('/ntuaflix_api/', home)
app.use((req,res,next) => {
    res.status(400).json({
        status: 400,
        message: "Bad Request"
    })
})

const privateKey = fs.readFileSync('server.key', 'utf8');
const certificate = fs.readFileSync('server.cert', 'utf8');
const credentials = { key: privateKey, cert: certificate };

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(port, ()=>{
    console.log(`App running and listening on port ${port}`)
})