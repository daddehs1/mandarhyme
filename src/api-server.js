var express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 3000;

var server = require('http').Server(app);
server.listen(port).then(() => {
  console.log('Listeninggg on port ' + port);
});

app.get('/', function(req, res, next) {
  return res.json({
    go: "ho"
  });
});

// var router = express.Router();
//
// app.use(router);
//
// router.route('/').get((req, res) => {
//   res.send("ok");
// });
//
// router.route('/search').get((req, res) => {
//   console.log(req.params);
//   res.send("ok");
// });

//app.use('/api', router);