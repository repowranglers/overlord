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

  }); // 'Link creation'
});
