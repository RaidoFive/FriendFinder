//Dependencies - path package to get the correct file path for our html
var path = require("path");

module.exports = function(app){
  // GET route to the survey page
  app.get("/survey", function(req, res){
    res.sendFile(path.join(__dirname, "../public/survey.html"))
  });

  // default GET route, back to the home page
  app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "../public/home.html"))
  });
}
