const express = require('express');
const router = express.Router();
const atob = require('atob');

/* GET home page. */
router.get('/', function(req, res, next) {

  let { i, t, d, b, url } = req.query;
  if (b==1) {
    t = atob(t);
    d = atob(d);
  };

  if (!i || !i.match(/^[0-9a-f\-]+$/)) {
    res.writeHead(400, {});
    res.end('Missing or invalid i query parameter.');
    return;
  }

  res.render('index', {
    t,
    d,
    i,
    url
  });

});

module.exports = router;
