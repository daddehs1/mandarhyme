 var express = require('express'),
   path = require('path'),
   bodyParser = require('body-parser'),
   cors = require('cors'),
   MandarinRhymes = require('mandarin-rhymes');

 const api = express();
 api.use(express.static('public'));
 api.use(bodyParser.json());

 var apiPort = process.env.PORT || 4000;
 var server = require('http').Server(api);

 api.use(cors());

 server.listen(apiPort, () => {
   console.log('Listening on port ' + apiPort);
 })

 var router = express.Router();

 router.route('/search').get((req, res) => {
   const searchQuery = req.query.q;
   const matchTones = req.query.t;
   if (searchQuery) {
     var rhymeGen = new MandarinRhymes(searchQuery);
     if (matchTones) {
       rhymeGen.withToneMatching();
     }
     rhymeGen.getRhymes().then((rhymes) => {
       res.json(rhymes);
     })
   } else {
     res.send({})
   }
 });

 api.use('/api', router);

 // FRONT-END VUE SERVER
 var serveStatic = require('serve-static');
 var app = express();
 app.use(serveStatic(__dirname + "/dist"));
 var port = process.env.PORT || 5000;
 app.listen(port);
 console.log('server started ' + port);