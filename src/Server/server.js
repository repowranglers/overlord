import express from 'express';
const app = express();
import passport from 'passport';
import {Strategy as GithubStrategy} from 'passport-github'
import browserify from 'browserify-middleware';
import path from 'path';
import db from './db.js'
import bodyparser from 'body-parser';
import session from 'express-session';

passport.use(new GithubStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // placeholder for translating profile into our own custom user object.
    // for now we will just use the profile object returned by GitHub
    return done(null, profile);
  }
));


//--------------Express Middlware-------------//
//--------------------------------------------//
// Load all files: get this to load style files in index.html
var assetFolder = path.join(__dirname, '..', 'client', 'public');
app.use(express.static(assetFolder));

app.use(bodyparser.json());
//app.use(bodyparser.urlencoded({ extended: true }))

//----------------- Server/Database Calls--------------------//
//----------------------------------------------------------//

// ****** Endpoints for Projects ******
// ************************************

// get projects by username
app.get('/api/projects/:username', (req, res) => {
  db('projects').where('user_name', req.params.username)
    .then( rows => {
      res.send(rows);
    })
})

// create a project
app.post('/api/projects', (req, res) => {
  db('projects').insert({
    proj_name: req.body.proj_name,
    user_name: req.body.user_name,
    start: req.body.start,
    due: req.body.due,
    status: 'not yet started'
  })
});

// update a project's status
app.patch('/api/projectStatus', (req, res) => {
  db('projects').where('project_id', req.body.project_id)
    .update({
      status: req.body.status
    })
})

// update a project's start date - June 29 1988 => 62988
app.patch('/api/projectStart', (req, res) => {
  db('projects').where('project_id', req.body.project_id)
    .update({
      status: req.body.start
    })
})

// update a project's due date - June 29 1988 => 62988
app.patch('/api/projectDue', (req, res) => {
  db('projects').where('project_id', req.body.project_id)
    .update({
      status: req.body.due
    })
})

// delete a project by project id
app.delete('/api/projects/:projectId', (rew, res) => {
  db('projects').where('project_id', req.body.project_id)
    .del()
      .then(() => {
        res.send({});
      })
})

// ***** Endpoints for Resources ******
// ************************************

app.get('/api/resources/:resourceId', (req, res) => {
// gets a specific resource
})

app.post('/api/resources', (req, res) => {
// adds a resource
});

app.patch('/api/resources/:resourceId', (req, res) => {
// updates a given resource (name, dates, resources)
})

app.delete('/api/resources/:resourceId', (rew, res) => {
// deletes a resource
})

// ******* Endpoints for Users ********
// ************************************

app.get('/api/users/:userId', (req, res) => {
// gets a specific user
})

app.post('/api/users', (req, res) => {
  db.addUser(req.body)
  res.status(201).send(res.body)
});

app.patch('/api/users/:userId', (req, res) => {
// updates a given user (name, dates, users)
})

//----------------- Serve JS Assets -------------------------//
//----------------------------------------------------------//
app.get('/bundle.js',
 browserify(__dirname +'/../client/index.js', {
    transform: [ [ require('babelify'), { presets: ['es2015', 'stage-0', 'react'] } ] ]
  })
);

//-------- Express Session and Passport Session -------------//
//----------------------------------------------------------//

app.use(session({
  secret: "enter custom sessions secret here",
  resave: true,
  saveUninitialized: true
  }));

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  // placeholder for custom user serialization
  // null is for errors
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // placeholder for custom user deserialization.
  // null is for errors
  done(null, user);
});

// we will call this to start the GitHub Login process
app.get('/auth/github', passport.authenticate('github'));

// GitHub will call this URL after line 37 runs
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/', function (req, res) {
  // var html = "<ul>\
  //   <li><a href='/auth/github'>GitHub</a></li>\
  //   <li><a href='/logout'>logout</a></li>\
  // </ul>";

  // // dump the user for debugging
  // if (req.isAuthenticated()) {
  //   html += "<p>authenticated as user:</p>"
  //   html += "<pre>" + JSON.stringify(req.user, null, 4) + "</pre>";
  // }

  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
});

app.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

// Simple route middleware to ensure user is authenticated.
//  Use this route middleware on any resource that needs to be protected.  If
//  the request is authenticated (typically via a persistent login session),
//  the request will proceed.  Otherwise, the user will be redirected to the
//  login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}

app.get('/protected', ensureAuthenticated, function(req, res) {
  res.send("acess granted");
});

//-------- End Express Session and Passport Session ---------//
//----------------------------------------------------------//


// Wild card route for client side routing.
app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
})

module.exports = app;

var server = app.listen(8080, function () {
  console.log('Overlord listening on localhost:', server.address().port);
});
