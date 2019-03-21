var express = require('express');
var rp = require('request-promise');

var app = express();

app.get('/followers/:username', async function(req, res){ //async function as I favor that over callback/promises

    var user = req.params.username;

    var options = {
                    uri: `https://api.github.com/users/${user}/followers`,
                    headers: {'user-agent': 'node.js', 'Content-Type': 'application/json'}
                  }


      var firstResults = await rp(options); //Using request-promise' package to make easy API calls

      firstResults = reduceFive(firstResults); //strip results down to 5


    for(var i = 0; i < firstResults.length; i++){
       options.uri = firstResults[i].followers_url; //change options to get followers' followers
       var secondResults = await rp(options);
       secondResults = reduceFive(secondResults);


        for(var a = 0; a < secondResults.length; a++){
          options.uri = secondResults[i].followers_url; //change options to get followers' followers
          var thirdResults = await rp(options);
          thirdResults = reduceFive(thirdResults);

          secondResults[i]["thirdFollowers"] = thirdResults; //append new property of thirdfollowers to each secondfollower
        }

       firstResults[i]["secondFollowers"] = secondResults;//append new property of secondfollowers to each firstFollower
    }
      res.json(firstResults);

});




function reduceFive(data){
  data = JSON.parse(data); //turn api response readable JSON format
  data = data.splice(0,5) //keep only 1-5 results
  return data;
}


app.listen(5000, function() {
  console.log('App listening on port 5000!')
})
