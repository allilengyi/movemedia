var express = require('express');
var router = express.Router();
var path = require('path');
var bodyParser = require('body-parser')
router.use( bodyParser.json() );

/* mastodon */

const fs = require('fs');
var http = require('http');
var Masto = require('mastodon')

var M = new Masto({
  access_token: 'c569d099456fb3cf55ffd11b5f4ef6d56bd8c439c630e3c4f98551db7620e5ea',
  timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
  api_url: 'https://mastodon.technology/api/v1/', // optional, defaults to https://mastodon.social/api/v1/
})

/* > mastodon */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/name', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../name.html'));
});

router.post('/name', function (req, res) {
  console.log(req.body);
  var name = req.body.name;
  res.render('index', { title: name });

});

router.get('/mastodon', function(req, res, next) {
  res.sendFile(path.join(__dirname + '/../mastodon.html'));

	// The following does not belong to this function, but only serves testing purposes
	// This is how account name is obtained
  M.get('accounts/verify_credentials', {}).then(resp => console.log(resp.data.username));
  M.get('accounts/verify_credentials', 
	function (err, data, response) {
	        console.log(data.username);
	}
  );
	// Todo: How to display it?
});

router.post('/mastodon', function (req, res) {
  console.log(req.body);
  var title = req.body.title;
  var content = req.body.content;

  M.post('statuses', { status: title + ": " + content})

  res.render('mastodon', { title: title, content: content});

});

module.exports = router;
