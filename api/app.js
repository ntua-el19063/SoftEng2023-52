const express = require('express');
const cors = require('cors');
const home = require('./routes/home')

const port = 5000
const app = express();

app.use(cors())
app.use(express.json())

app.use('/', home)

app.listen(port, ()=>{
    console.log(`App running and listening on port ${port}`)
})