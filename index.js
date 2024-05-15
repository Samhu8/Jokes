import express, { json } from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke/"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", (req,res) => {
    res.render("index.ejs");
});

app.post("/joke-result", async (req,res) => {
    const selection = req.body.chosen
    try {
        const result = await axios.get(API_URL + selection + "?safe-mode");
        res.render("index.ejs", {
            joke : JSON.stringify(result.data.joke),
            setup : JSON.stringify(result.data.setup),
            delivery : JSON.stringify(result.data.delivery)
        });
    } catch (error) {
        res.render("index.ejs" , { content : JSON.stringify(error.response.data)});
    }
});


app.listen(port, ()=> {
    console.log(`Server running on port ${port}.`);
});