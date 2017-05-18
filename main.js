let e = require("express");
let app = e();
let exphbs  = require('express-handlebars');
let firebase = require("firebase");
let bp=require('body-parser');
let googleMapsClient = require('@google/maps').createClient({key: 'AIzaSyCj2rghp5k8TD8nsbiO0c8Hj9O99GKu9PQ'});
const Agent = require('node-rest-client').Client;
const nrc = new Agent();




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
const db=firebase.database();
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
        auth.createUserWithEmailAndPassword(req.body.em, req.body.pw).catch((e)=>console.log(e)).then(()=>{
                db.ref("users/"+req.body.em.split(/[.@-_]/).join('')).set({"fname": req.body.fn,"lname":req.body.ln,"email":req.body.em}).catch((e)=>console.log(e));
                db.ref("users/"+req.body.em.split(/[.@-_]/).join('')+"/favorites/favoritePOIs").set([]);
                x=db.ref("users/"+req.body.em.split(/[.@-_]/).join('')+"/favorites/favoritePOIs");
                x.update({0:8});


                res.redirect('signupsuccess');
        })  
}
);

app.get('/signupsuccess', function(req, res){
        auth.signOut();
        res.render("signupsuccess",{login:req.route.path.split('s')[0]});
});



app.post('/places',function(req,res){
let tab='<table><tr><th>Name</th><th>Rating</th><th>Address</th><th>Add to favorites</th></tr><tr id="par">';

nrc.get('https://maps.googleapis.com/maps/api/place/textsearch/json?query='+req.body.place+'&key=AIzaSyCj2rghp5k8TD8nsbiO0c8Hj9O99GKu9PQ',(d,r)=>{
        let data=d.results;

        for (let i=0;i<data.length;++i)
        {
             ech='<td>'+data[i].name +'</td>'+'<td>'+data[i].rating+'</td>'+'<td>'+data[i].formatted_address+'</td>'+'<td><input type="button" class="genbutt"><td></tr><tr id="par">';
             tab+=ech;
        }
        tab+="</tr></table>"

        res.setHeader("content-type",'text/html');    
        res.render('places',{tabl:tab});
});
}
);

app.get('/addtofavorites',function(req,res){
let em=auth.currentUser.email.split(/[.@-_]/).join('');
let thedb=db.ref("users/"+em+"/favorites/favoritePOIs");
let i = Math.floor(Math.random() * 100000);


thedb.update({i:req.query.data}).catch((e)=>res.send(e)).then(()=>{res.send('User favorites updated')});
});


auth.onAuthStateChanged((user)=>{
        if (user) 
        {
        console.log(auth.currentUser.email+' user logged in')
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
