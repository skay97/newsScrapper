var express = require("express");
var mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");

var PORT = 3001;

// Initialize Express
var app = express();

// Configure middleware

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Connect to the Mongo DB-------Need to fix this
mongoose.connect("mongodb://localhost/salmanKarim", { useNewUrlParser: true });

// A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
    // First, we grab the body of the html with axios
    axios.get("https://www.reddit.com/search?q=news").then(function(response) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(response.data);
      console.log(response.data)
  
      // Now, we grab every h2 within an article tag, and do the following:
      $("div.s1okktje-1").each(function(i, element) {
        // Save an empty result object
        var result = {};
  
        // Add the text and href of every link, and save them as properties of the result object
        // where is the .title coming from?
        result.title = $(this).find("h2").text();
        result.link = $(this)
          .find(".SQnoC3ObvgnGjWt90zD9Z")
          .attr("href");
        console.log(result)
  
        // Create a new Article using the `result` object built from scraping
        //where is all this information being stored? how to access and delete it
        db.Article.create(result)
          .then(function(dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function(err) {
            // If an error occurred, log it
            console.log(err);
          });
      })
  
      // Send a message to the client
      res.send("Scrape Complete");
    });
  });

  app.get("/articles", function(req, res) {
    // Grab every document in the Articles collection
    db.Article.find({})
      .then(function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch(function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  // Start the server
app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });