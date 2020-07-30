const express = require("express");
const cors = require("cors")
const axios = require('axios')

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false
  })
);

app.use(cors())

// route to get the github jobs
app.get("/", async function(req, res) {
    let result = await axios.get('https://jobs.github.com/positions.json', {
        params: {...req.query}
    })

    return res.json({ 
        data: result.data
    });
});

// Listeinng to the app
app.listen(8000, function() {
    console.log(`Express is running on port 8000`);
});
  