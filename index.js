import format from 'date-format';
import dotenv from "dotenv";
import app from './app.js';
dotenv.config()

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
    console.log(`${format.asString("dd-MM-yyyy hh:mm:ss", new Date())} || Server is up and running in ${PORT}`)
})