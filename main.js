let e = require("express");
let app = e();
let exphbs  = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/static', e.static('public'));

app.get('/', function(req, res){
        res.render("home",{sin: req.route.path+"signup"});
});


app.get('/dashboard', function(req, res){
        res.render("dashboard",{
                 nam: req.query.em,
                namee: req.query.pw
        });
});

app.get('/signup', function(req, res){
        res.render("signup")
});

app.use(function(req, res){
        res.status(404);
        res.render('notfound');
});



app.listen(8080, function(){
  console.log( 'Express started on http://localhost:' + 8080 + '; press Ctrl-C to terminate.' );
});