  import express from 'express';
const app = express();
import passport from 'passport';
import {Strategy as GithubStrategy} from 'passport-github'
import browserify from 'browserify-middleware';
import path from 'path';
import db from './db.js';
import bodyparser from 'body-parser';
import session from 'express-session';
import projects from'./models/projects.js'
import cookieParser from 'cookie-parser'
import users from './models/users'
import resources from './models/resources';
import Promise from 'bluebird';
import stories from './models/stories'


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

// ****** Endpoints for Stories *******
// ************************************

// adds a story
app.post('/api/stories', (req, res) => {
  stories.addStory(req.body)
  .then((row) => {
    res.status(201).json(row)
  }).catch((err) => {
    res.status(500).json(err)
  })
})

// updates a story status
app.patch('/api/stories/status/:story_id', (req, res) => {
  stories.updateStatus(req.params.story_id, req.body.date_completed)
  .then((row) => {
    res.status(200).json(row)
  }).catch((err) => {
    res.status(500).json(err)
  })
})

// updates a story description
app.patch('/api/stories/description/:story_id', (req, res) => {
  stories.updateDescription(req.params.story_id, req.body.description)
  .then((row) => {
    res.status(200).json(row)
  }).catch((err) => {
    res.status(500).json(err)
  })
})

// updates a story title
app.patch('/api/stories/title/:story_id', (req, res) => {
  stories.updateTitle(req.params.story_id, req.body.title)
  .then((row) => {
    res.status(200).json(row)
  }).catch((err) => {
    res.status(500).json(err)
  })
})

// gets stories by project_id
app.get('/api/stories/:proj_id', (req, res) => {
  stories.getStories(req.params.proj_id)
  .then((row) => {
    res.status(200).json(row)
  }).catch((err) => {
    res.status(500).json(err)
  })
})

// deletes a story
app.delete('/api/stories/config/:story_id', (req, res) => {
  stories.deleteStory(req.params.story_id)
  .then((row) => {
    res.status(200).json(row)
  }).catch((err) => {
    res.status(500).json(err)
  })
})

// ****** Endpoints for Projects ******
// ************************************

// get projects by username
app.get('/api/projects/meta/:username', (req, res) => {
    projects.getProjectsByName(req.params.username)
    .then( rows => {

      rows.map(row => row.resources = [])
     return rows;
    })
    .then(rows => {
      //run map async 
      return Promise.map(rows, row => {
        return db('resources').where('proj_id', row.project_id)
        .then(resArray => {
          row.resources = resArray;
          return row;
        })
      })
    })
    .then( data => {
      res.send(data);
    })
})

// get a specific project
app.get('/api/projects/:project_id', (req, res) => {
  projects.getProjectsByID(req.params.project_id)
  .then((row) => {
    res.status(200).send(row)
  }).catch((err) => {
    res.status(500).send(err)
  })
})

// create a project
app.post('/api/projects', (req, res) => {
  projects.addProject(req.body)
  .then((row) => {
    res.status(201).send(row)
  }).catch((err) => {
    res.sendStatus(500)
  })
});

// update a project's status (pending, started, complete)
app.patch('/api/projects/status/:project_id', (req, res) => {
  projects.updateProjectStatus(req.body.status, req.params.project_id)
    .then((row) => {
      res.send(200)
    }).catch((err) => {
      res.status(500).send(err)
    })
})

// update a project's start date - June 29 1988 => 62988
app.patch('/api/projects/start/:project_id', (req, res) => {
 projects.updateProjectStartDate(req.body.start, req.params.project_id)
    .then((row) => {
      res.send(200)
    }).catch((err) => {
      res.status(500).send(err)
    })
})

// update a project's due date - June 29 1988 => 62988
app.patch('/api/projects/due/:project_id', (req, res) => {
  projects.updateProjectDueDate(req.body.due, req.params.project_id)
    .then((row) => {
      res.send(200)
    }).catch((err) => {
      res.status(500).send(err)
    })
})

// delete a project by project id
app.delete('/api/projects/:project_id', (req, res) => {
  projects.deleteProject(req.params.project_id)
      .then(() => {
        res.send({});
      })
})

// ***** Endpoints for Resources ******
// ************************************

// creates a resource - null means free

app.post('/api/resources', (req, res) => {
  resources.createResource(req.body)
    .then((row) => {
      res.status(201).send(row)
    }).catch((err) => {
      res.sendStatus(500)
    })
});


// gets all resources available to company
//  ex: Olaf Corp is written as Olaf-Corp

app.get('/api/resources/:company', (req, res) => {
  let company = req.params.company.replace(/-/g, " ")
  resources.getCompResources(company)
    .then( rows => {
      res.send(rows);
    })
})

// updates a resource's assigned project

app.patch('/api/resources/project/:res_id', (req, res) => {
  resources.assignResource(req.params.res_id, req.body.proj_id)
    .then((rows) => {
      res.send(200)
    })
})

// deletes a resource

app.delete('/api/resources/:res_id', (req, res) => {
  resources.deleteResource(req.params.res_id)
    .then(() => {
        res.send({});
    })
})

// ******* Endpoints for Users ********
// ************************************

// gets user info by username
app.get('/api/users/:gh_name', (req, res) => {
  users.getUser(req.params.gh_name)
    .then((row) => {
      res.status(200).send(row)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
})

// creates a user
app.post('/api/users', (req, res) => {
  users.addUser(req.body)
    .then((row) => {
      res.status(201).send(row)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
});

// updates a user image by username
app.patch('/api/users/image/:gh_name', (req, res) => {
  users.updateImage(req.params.gh_name, req.body)
    .then((row) => {
      res.sendStatus(200)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
})

// updates a user company by username
app.patch('/api/users/company/:gh_name', (req, res) => {
  users.updateCompany(req.params.gh_name, req.body)
    .then((row) => {
      res.sendStatus(200)
    })
    .catch((err) => {
      res.status(500).send(err)
    })
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
app.use(cookieParser())
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

  
    res.cookie('gh_name',req.user._json.login);
    res.cookie('gh_img', req.user._json.avatar_url);
    res.cookie('company',req.user._json.company);    
  
    res.redirect('/dashboard');
  });

// app.get('/', function (req, res) {
//   // var html = "<ul>\
//   //   <li><a href='/auth/github'>GitHub</a></li>\
//   //   <li><a href='/logout'>logout</a></li>\
//   // </ul>";

//   // // dump the user for debugging
//   // if (req.isAuthenticated()) {
//   //   html += "<p>authenticated as user:</p>"
//   //   html += "<pre>" + JSON.stringify(req.user, null, 4) + "</pre>";
//   // }

//   res.sendFile(path.join(__dirname, '..', 'client', 'index.html'));
// });

app.get('/logout', function(req, res){
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

app.get('/dashboard', ensureAuthenticated, function(req, res) {
  res.sendFile(assetFolder + '/index.html');
});

//-------- End Express Session and Passport Session ---------//
//----------------------------------------------------------//


// Wild card route for client side routing.
app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, '..', 'client', 'public', 'index.html'));
})

module.exports = app;

var server = app.listen(8080, function () {
  console.log('Overlord listening on localhost:', server.address().port);
});
