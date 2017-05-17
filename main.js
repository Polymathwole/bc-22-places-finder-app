let e = require("express");
let app = e();
let exphbs  = require('express-handlebars');
let firebase = require("firebase");
let bp=require('body-parser');


let config = {
    apiKey: "AIzaSyAa7vfOxueB1yw0GmZVnvuBqovAzXt18Pk",
    authDomain: "places-finder-app.firebaseapp.com",
    databaseURL: "https://places-finder-app.firebaseio.com",
    projectId: "places-finder-app",
    storageBucket: "places-finder-app.appspot.com",
    messagingSenderId: "26417830481"
  };

firebase.initializeApp(config);

const auth=firebase.auth();
app.use(bp());

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use('/static', e.static('public'));

app.get('/', function(req, res){
        res.render("home",{sin: req.route.path+"signup"});
});


app.post('/dashboard', function(req, res){
        console.log(req.body);
        auth.signInWithEmailAndPassword(req.body.em, req.body.pw).then((resp)=>{
                if(resp.uid){
                        let trm=req.body.em.split("@")[0];
                        res.render("dashboard",{nam: trm, logout:req.route.path.split('d')[0]+"logout"});                        
                }
        }).catch((e)=>{
                console.log(e)
                res.redirect('/');
        });
});


app.get('/logout', function(req, res){
        auth.signOut();
        res.render("logout",{login:req.route.path.split('l')[0]});
});

app.get('/signup', function(req, res){
        res.render("signup");
});

app.post('/authenticate',function(req,res){
        console.log(req.body);
        auth.createUserWithEmailAndPassword(req.body.em, req.body.pw).catch((e)=>console.log(e));       

}
);

auth.onAuthStateChanged((user)=>{
        if (user) 
        {
        console.log('user logged in')
        } 
        else 
        {
        console.log('user logged out')
        }});



app.use(function(req, res){
        res.status(404);
        res.render('notfound');
});



app.listen(process.env.PORT||8080, function(){
  console.log( 'Express started on http://localhost:' + 8080 + '; press Ctrl-C to terminate.' );
});