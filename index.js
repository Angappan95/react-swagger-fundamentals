import format from "date-format";
import express from "express";
import swaggerUi from "swagger-ui-express";
import YAML from 'yamljs';

const swaggerDocument = YAML.load("./swagger.yml")
const app = express();
const PORT = process.env.PORT || 4000

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/home', (req, res) => {
    res.status(200).json({response: "Hello world this is Home path"})
})

app.get('/get/insta', (req, res) => {
    const instaData = {
        users: [{
            name: "instaUser",
            followers: 50,
            follows: 100
        }],
        date: Date.now()
    }
    return res.status(200).json(instaData)
})

app.get('/get/facebook', (req, res) => {
    const facebookData = {
        users: [{
            name: "facebookUser",
            followers: 50,
            follows: 100
        }],
        date: Date.now()
    }
    return res.status(200).json(facebookData)
})

app.get('/get/linkedin', (req, res) => {
    const linkedInData = {
        users: [{
            name: "linkedInUser",
            followers: 50,
            follows: 100
        }],
        date: Date.now()
    }
    return res.status(200).json(linkedInData)
})

app.get('/get/data/:id', (req, res)=> {
    return res.status(200).json({data: req.params.id})
})

app.listen(PORT, () => {
    console.log(`${format.asString("dd-MM-yyyy hh:mm:ss", new Date())} || Server is up and running in ${PORT}`)
})