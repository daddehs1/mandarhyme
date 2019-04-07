var express = require('express'),
  path = require('path'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  MandarinRhymes = require('mandarin-rhymes');

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());

var port = process.env.PORT || 4000;
var server = require('http').Server(app);

app.use(cors());

server.listen(port, () => {
  console.log('Listening on port ' + port);
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

app.use('/api', router);