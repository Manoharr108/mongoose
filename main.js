require("dotenv").config();
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const operation = require("./model/message.model.js")
const path = require('path')
const port = process.env.PORT || 3000
app.use(express.json())
const cors = require('cors')
app.use(express.static(path.join(__dirname,"./public")))
app.use(cors("*"))

app.post('/', async (req, res) => {
    try {
        const product = await operation.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})


app.get('/', async (req, res) => {
    try {
        const product = await operation.find({})
        res.status(200).json(product)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message })
    }
})




app.listen(port, () => {
    mongoose.connect("mongodb+srv://manohar2004gr:5DFpcNwqPVvyLaww@testapi.unppitm.mongodb.net/?retryWrites=true&w=majority&appName=TestApi")
        .then(() => console.log('connected'))
        .catch(e => console.log(e));
        console.log("port litening to 3000")
})