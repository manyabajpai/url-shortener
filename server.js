const express = require("express");
const  shortid = require("shortid");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const  Url = require("./Url");
const  utils = require("./Util/util");

const bodyParser = require('body-parser');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 5000;
  


// Database connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Db Connected`);
  })
  .catch((err) => {
    console.log("ERROR IN CONNECTING DB", err.message);
  });

app.post('/short', async (req, res) => {
    console.log(req.body);
    const { originalUrl } = req?.body;
    const base = `http://localhost:5000`;
    const urlId = shortid.generate();

    if (utils.validateUrl(originalUrl)) {
      try{
        let urlRes = await Url.findOne({ originalUrl });
        console.log("urlRes--", urlRes);
        if(urlRes){
            res.json(urlRes);
        }else{
          const shortUrl = `${base}/${urlId}`;
          url = new Url({
            originalUrl,
            shortUrl,
            urlId,
            date: new Date(),
          });

          await url.save();
          return res.status(200).json(url);
        }

      }catch(err){
        console.log("Error", err);
        res.status(500)
      }
    }else{
      res.status(400).json('Invalid Original Url');
    }
 
});

app.get("/all", async(req, res) => {
  Url.find((error, data) => {
    if(error){
      return next(error);
    }else {
      res.json(data);
    }
  })
});


// redirect endpoint
app.get("/:urlId", async (req, res) => {
  try {
    const url =  await Url.findOne({ urlId: req.params.urlId});
    console.log('url', url);
    if(url){
      url.clicks++;
      url.save();
      return res.redirect(url.originalUrl);
    }else{
      res.status(404).json("Not found");
    }
  } catch(err) {
    console.log("Error -", err);
    res.status(500).json("Server Error");
  }
});
  
app.listen(port, () => console.log(`Listening on port ${port}`));