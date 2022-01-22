import express from "express";
import fileUpload from 'express-fileupload';
import { dirname } from 'path';
import swaggerUi from "swagger-ui-express";
import { fileURLToPath } from 'url';
import YAML from 'yamljs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const swaggerDocument = YAML.load("./swagger.yml")
const app = express();
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
// Adding fileUpload middleware to intercept file sent via requestBody
app.use(fileUpload())

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

app.get('/get/data', (req, res) => {
    let id = Number(req.query.id)
    let type = req.query.type
    let result = profiles.filter(profile => ((profile.type === type) && (profile.id == id)))
    try {
        if (result.length > 0) {
            return res.status(200).json({ data: result })
        } else {
            return res.status(400).json({ message: 'No records found' })
        }
    } catch (err) {
        return res.status(500).json({ message: 'Something went wrong', error: err })
    }
})

app.post('/add/profile', (req, res) => {
    let data = req.body
    console.log(data)
    try {
        profiles.push(data)
        return res.status(201).json({ isSuccess: true })
    }
    catch (err) {
        return res.status(500).json({ isSucess: false, error: err })
    }

})

app.post('/add/profile/bulk', (req, res) => {
    let file = req.files.file
    let path = `${__dirname}/resources/${Date.now()}.json`
    console.log(`Incoming data: \n ${file.data.toString()}`) // file.data -> returns buffer representation of file. To convert back to string use .toString function
    let data = JSON.parse(file.data.toString()) // convert back to JSON

    // Store the file under resources
    file.mv(path, (err) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ isSuccess: false, error: err })
        }
    })

    if (data instanceof Array) {
        data.forEach(item => profiles.push(item))
        return res.status(201).json({ isSuccess: true })
    } else if (data instanceof Object) {
        profiles.push(data)
        return res.status(201).json({ isSuccess: true })
    } else {
        return res.status(400).json({ isSuccess: false, data })
    }

})

export default app;