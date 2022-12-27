const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
  
app.post('/short', (req, res) => {
    console.log(req.body);
    res.send(
    `I received your POST request. This is what you sent me: ${req.body?.url}`,
  );
});
  
app.listen(port, () => console.log(`Listening on port ${port}`));