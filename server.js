const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors = require('cors')

mongoose.connect("mongodb://localhost:27017/databaseAssignment")
app.use(bodyParser.json())
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions))
// app.use(bodyParser.urlencoded({ extended: true }))

var dataSchema = new mongoose.Schema({
  name: String,
  age: String,
  gender: String,
})

var Data = mongoose.model("Data", dataSchema)

app.get("/", (req, res) => {
  res.status(200).send("Hello world")
})

app.post("/", (req, res) => {
  var myData = new Data(req.body)
  myData
    .save()
    .then((item) => {
      res.send("item saved to database")
    })
    .catch((err) => {
      res.status(400).send("unable to save to database")
    })
})

app.listen(8080, () => {
  console.log("Server running at 8080")
})
