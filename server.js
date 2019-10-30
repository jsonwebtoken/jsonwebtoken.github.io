const express = require('express');
const enforce = require('express-sslify');

const app = express();

if(process.env.NODE_ENV === 'production') {
  console.log('Redirecting to TLS endpoint.');
	app.use(enforce.HTTPS({
    // Required for proper use under a reverse proxy (Heroku, etc.).
    trustProtoHeader: true
  }));
}

app.use('/', express.static('dist/website'));

// Fallback for the homepage JWT handbook CTA A/B experiment we ran
app.get('/home', function (req, res) {
    res.redirect('/');
});

app.listen(process.env.PORT || 3000, function() {
	console.log('Started.');
});
