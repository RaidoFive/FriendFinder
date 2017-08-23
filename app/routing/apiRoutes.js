module.exports = function(app) {
  var path = require('path');
  var friends = require('../data/friends.js');

  app.get('/api/friends', function(req, res) {
    response.json(friends);
  });

  app.post('/api/friends', function(req, res) {
    var total = [];
    for(var i = 0; i < friends.length; i++) {
      var matched = friends[i].scores;
        for(var j = 0; j < matched.length; j ++) {
          var diff = 0;
            diff += Math.abs(req.body.score[j] - matched[j]);
        }
        total.push(diff);
    };
    var index = 0;
      var val = diff[0];

      function lowIdx(arr) {
        for (var i = 0; i < arr.length; i++) {
          if(arr[i] < val) {
            val = arr[i];
            index = i;
          }
        };
        return index;
      };
      var bestMatch = friends[lowIdx(diff)];
      response.send(bestMatch);
  });
};