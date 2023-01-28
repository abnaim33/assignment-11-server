const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const reviewRoute = require('./routes/reviewRoutes')
const orderRoute = require('./routes/orderRoutes')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api', reviewRoute)
app.use('/api', orderRoute)


mongoose.connect(process.env.DB_URI)
    .then(() => console.log('database connected'))

app.get("/", (req, res) => {
    res.send("hello world")
})


app.listen(process.env.PORT || 5000, () => console.log(`server is running on port ${process.env.PORT || 5000}`))