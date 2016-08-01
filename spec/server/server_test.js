import {expect} from 'chai';
import request from 'supertest-as-promised';

var app = require('../../src/server/server.js')

describe('', function() {


  describe('Projects:', function(){

    var client = null

    beforeEach(function(){      // create a user that we can then log-in
      client = request.agent(app)
      //
      // TODO: Uncomment when you implement user accounts
      //
      // return createUserAndSignIn(client);
    });
    // an endpoint to our server requesting to post a user name and company
    it('adds a project,', function() {
      // dont know what this does honestly, but it it works.
      return client
        .post('/api/projects')
        // have to stringify before sending for sure
        //this will send the object to the server.
        .send({
          proj_name: 'Overlord',
          user_name: 'mikemfleming',
          start: 72916,
          due: 80216,
          status: 'started'
        }).expect(201)
        knex.schema.dropTable('projects');
        // knex.destroy();
    });

    it('gets a project by username', function(){
      return client
        .get('/api/projects/mikemfleming')
        .expect(200)
    })

    it('updates a project status', function(){
      return client
        .patch('/api/projects/status/1')
        .send({
          status: 'complete'
        })
        .expect(200)
    })

    it('updates a project start date', function(){
      return client
        .patch('/api/projects/start/1')
        .send({
          start: 122516
        })
        .expect(200)
    })

    it('updates a project due date', function(){
      return client
        .patch('/api/projects/due/1')
        .send({
          due: 10117
        })
        .expect(200)
    })

    it('deletes a project', function(){
      return client
        .delete('/api/projects/2')
        .expect(200)
    })




    xdescribe('Shortening links:', function(){

      it('Responds with the short code', function() {
        return client
          .post('/links')
          .send({ url: 'http://www.roflzoo.com/' })
          .expect(201)
          .expect(function (res) {
            expect(res.body.url).to.equal('http://www.roflzoo.com/');
            expect(res.body.code).to.not.be.null;
          })
      });

      it('New links create a database entry', function() {
        return client
          .post('/links')
          .send({ url: 'http://www.roflzoo.com/' })
          .expect(201)
          .expect(function (res) {
            return Link.findByUrl('http://www.roflzoo.com/')
              .then(function(link) {
                expect(link.url).to.equal('http://www.roflzoo.com/');
              })
          })
      });

      it('Fetches the link url title', function () {
        // Mock to avoid HTTP request
        var originalFn = util.getUrlTitle
        util.getUrlTitle = function () {
          return Promise.resolve('Funny pictures of animals, funny dog pictures')
        }

        return client
          .post('/links')
          .send({ url: 'http://www.roflzoo.com/' })
          .expect(201)
          .expect(function (res) {

            util.getUrlTitle = originalFn

            return Link.findByUrl('http://www.roflzoo.com/')
              .then(function(link) {
                expect(link.url).to.equal('http://www.roflzoo.com/');
                expect(link.title).to.equal('Funny pictures of animals, funny dog pictures')
              })
          })
      });

    }); // 'Shortening links'

    xdescribe('With previously saved links:', function(){

      var link;

      beforeEach(function(){

        // save a link to the database
        return Link.create({
          url: 'http://www.roflzoo.com/',
          title: 'Rofl Zoo - Daily funny animal pictures',
          base_url: 'http://127.0.0.1:4568'
        }).then(function(newLink){
          link = newLink
        });
      });

      it('Returns the same shortened code', function() {
        return client
          .post('/links')
          .send({ url: 'http://www.roflzoo.com/' })
          .expect(200)
          .expect(function (res) {
            var code = res.body.code
            expect(code).to.equal(link.code);
          })
      });

      it('Shortcode redirects to correct url', function() {
        return client
          .get('/' + link.code)
          .expect(302)
          .expect('Location', 'http://www.roflzoo.com/')
      });

      xit('Returns all of the links to display on the links page', function() {
        return client
          .get('/links')
          .expect(200)
          .expect(function (res) {
            var responseLink = res.body[0]
            expect(responseLink.title).to.equal("Rofl Zoo - Daily funny animal pictures")
            expect(responseLink.code).to.equal(link.code)
          })
      });

    }); // 'With previously saved links'

  }); // 'Link creation'


 xdescribe('Privileged Access:', function(){

    it('Redirects to login page if a user tries to access the main page and is not signed in', function() {
      return request(app)
        .get('/')
        .expect(302)
        .expect('Location', '/login')
    });

    it('Redirects to login page if a user tries to create a link and is not signed in', function() {
      return request(app)
        .get('/create')
        .expect(302)
        .expect('Location', '/login')
    });

    it('Redirects to login page if a user tries to see all of the links and is not signed in', function() {
      return request(app)
        .get('/links')
        .expect(302)
        .expect('Location', '/login')
    });

  }); // 'Privileged Access'

xdescribe('Account Creation:', function(){

    it('Signup creates a user record', function() {
      return request(app)
        .post('/signup')
        .send({ username: 'Svnh', password: 'Svnh' })
        .expect(function () {
          return User.findByUsername('Svnh')
            .then(function (user) {
              expect(user).to.not.equal(undefined)
              expect(user.username).to.equal('Svnh')
              expect(typeof user.password).to.equal('string')
            })
        })
    });

    it('Signup logs in a new user', function() {
      return request(app)
        .post('/signup')
        .send({ username: 'Phillip', password: 'Phillip' })
        .expect(302)
        .expect('Location', '/')
    });

  }); // 'Account Creation'

 xdescribe('Account Login:', function () {

    var client = null

    beforeEach(function () {
      client = request.agent(app)

      return User.create({
        username: 'Phillip',
        password: 'Phillip'
      })
    })

    it('Logs in existing users', function() {
      return client
        .post('/login')
        .send({ username: 'Phillip', password: 'Phillip' })
        .expect(302)
        .expect('Location', '/')
    });

    it('Users that do not exist are kept on login page', function() {
      return client
        .post('/login')
        .send({ username: 'Fred', password: 'Fred' })
        .expect(302)
        .expect('Location', '/login')
    });

  });

});


