const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	
	let { imageUrl, title, description, url } = req.query;
	imageUrl 		= (imageUrl) ? decodeURIComponent(imageUrl) : '';
	title 	 		= (title) ? decodeURIComponent(title) : '';
	description	= (description) ? decodeURIComponent(description) : '';
	url 				= (url) ? decodeURIComponent(url) : '';

  res.render('index', { 	
  	title,
  	description,
  	imageUrl,
  	url
  });

});

module.exports = router;
