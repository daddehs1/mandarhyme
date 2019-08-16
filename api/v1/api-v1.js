var express = require('express')
var router = express.Router()
const MandarinRhymes = require('mandarin-rhymes');

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

module.exports = router;