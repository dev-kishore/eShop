const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
const userAPI = require('./apis/user')
const adminAPI = require('./apis/admin')
require('dotenv').config()
const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
app.use(express.static(path.join(__dirname, 'dist/eshop')))
mongoose.connect(DATABASE_URL).then(() => console.log("Database connected successfully!")).catch(err => console.log(err))
app.use('/user', userAPI)
app.use('/admin', adminAPI)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/eshop/index.html'))
})
app.listen(PORT, () => console.log(`Server started and listening on ${PORT}...`))