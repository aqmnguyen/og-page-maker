var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	
	let { imageUrl, title, description } = req.query;
	imageUrl = (imageUrl) ? decodeURIComponent(imageUrl) : '';

  res.render('index', { 	
  	title,
  	description,
  	imageUrl
  });

});

module.exports = router;
