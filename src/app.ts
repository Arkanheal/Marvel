// Dotenv setup
import * as dotenv from "dotenv";
dotenv.config();

// Express Setup
import express from "express";
const app = express();
const port = 5000;

// CORS
import cors from "cors";

const options: cors.CorsOptions = {
    origin: ['http://localhost:4200'],
}

app.use(cors(options));

// Requests import
import { getCharacters, getComic } from "./request";

// Routes endpoints
app.get("/", async (req, res) => {
    try {
        // Setup pages
        let offset: number = 100;
        if (req.query.page) {
            const page = req.query.page as string;
            offset += +page * 10;
        }

        // Get next 20 characters (starting from offset)
        const result = await getCharacters(offset);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

app.get("/:id", async (req, res) => {
    try {
        // Setup pages
        let id: number = +req.params.id;

        // Get next 20 characters (starting from offset)
        const result = await getComic(id);
        res.send(result);
    } catch (error) {
        res.send(error);
    }
});

// Listening
app.listen(port, () => {
    return console.log(`Express is listening on port http://localhost:${port}`);
});
