import format from "date-format";
import express from "express";
import jsonschema from "jsonschema";
import swaggerUi from "swagger-ui-express";
import YAML from 'yamljs';

const swaggerDocument = YAML.load("./swagger.yml")
const app = express();
const PORT = process.env.PORT || 4000
var validator = jsonschema.Validator
var v = new validator()

var profileSchema = {
    "id": { "type": "number" },
    "name": { "type": "string" },
    "type": { "type": "string" },
    "followers": { "type": "number" },
    "follows": { "type": "number" }
};

let profiles = [
    {
        id: 10001,
        name: "User1",
        type: "insta",
        followers: 50,
        follows: 100
    }, {
        id: 10001,
        name: "User1",
        type: "facebook",
        followers: 50,
        follows: 100
    }, {
        id: 10001,
        name: "User1",
        type: "linkedin",
        followers: 50,
        follows: 100
    }, {
        id: 10002,
        name: "User2",
        type: "glassdoor",
        followers: 50,
        follows: 100
    }, {
        id: 10002,
        name: "User2",
        type: "insta",
        followers: 50,
        follows: 100
    }, {
        id: 10003,
        name: "User3",
        type: "insta",
        followers: 50,
        follows: 100
    },
];

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// Adding Json parser to parse the incoming json data
app.use(express.json())

app.get('/home', (req, res) => {
    res.status(200).json({ response: "Hello world this is Home path" })
})

app.get('/get/insta', (req, res) => {
    let result = profiles.filter(profile => profile.type === "insta")
    return res.status(200).json({ users: result })
})

app.get('/get/facebook', (req, res) => {
    let result = profiles.filter(profile => profile.type === "facebook")
    return res.status(200).json({ users: result })
})

app.get('/get/linkedin', (req, res) => {
    let result = profiles.filter(profile => profile.type === "linkedin")
    return res.status(200).json({ users: result })
})

app.get('/get/data/:id', (req, res) => {
    return res.status(200).json({ data: req.params.id })
})

app.post('/add/profile', (req, res) => {
    let data = req.body
    console.log(data)
    try {
        profiles.push(data)
        return res.status(201).json({isSuccess: true})
    }
    catch (err) {
        return res.status(500).json({isSucess: false, error: err})
    }

})

app.listen(PORT, () => {
    console.log(`${format.asString("dd-MM-yyyy hh:mm:ss", new Date())} || Server is up and running in ${PORT}`)
})