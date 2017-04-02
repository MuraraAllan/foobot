var express = require('express');
var path = require('path');
var app = express();
var handlebars = require('handlebars');
var exphbs = require('express-handlebars');
 app.engine('handlebars', exphbs({layoutsDir:'visual/layouts/',defaultLayout: 'main'})); 
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);
app.set('views',  path.join(__dirname, '/visual'))

var options = { dotfiles: 'ignore', etag: false,
extensions: ['htm', 'html'],
index: false
};
app.use(express.static(path.join(__dirname, 'visual') , options  ));
app.get('/', function(req, res)
{
   res.render('main', {title:'oi'});
});

app.listen(app.get('port'),  function () {
console.log('Hello express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.' );
});