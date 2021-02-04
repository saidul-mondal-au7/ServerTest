const express = require('express');
require('./db/keys')
const app = express();

const bodyParser = require('body-parser');

const port = process.env.PORT;


app.use(bodyParser.json());


app.use('/api', require('./routers/serverRoutes'));
  
// error handling middleware
app.use((err, req, res, next) => {
  res.status(422).send({error: err.message});
});

app.listen(port, () => {
    console.log("Listening on port: " + port);
});

// npm run dev