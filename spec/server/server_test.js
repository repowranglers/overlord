import {expect} from 'chai';
import request from 'supertest-as-promised';
import db from '../../src/server/db'

console.log(  "************************************\n"
            + "************************************\n"  
            + "******                        ******\n"
            + "****    BEFORE RUNNING TESTS     ***\n"
            + "** MAKE SURE TO DO THE FOLLOWING ***\n"
            + "**    1) knex migrate:rollback   ***\n"
            + "**    2) knex migrate:latest     ***\n"
            + "***                             ****\n"
            + "************************************\n"  
            + "************************************\n" )

db.migrate.latest()

var app = require('../../src/server/server.js')

describe('', function() {

  describe('Projects:', function(){

    var client = null

    beforeEach(function(){      
      client = request.agent(app)
    });

    it('adds a project,', function() {
      return client
        .post('/api/projects')
        .send({
          proj_name: 'Overlord',
          user_name: 'mikemfleming',
          start: '2016-02-22',
          due: '2016-09-22',
          status: 'started'
        }).expect(201)
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
          start: "2016-10-31"
        })
        .expect(200)
    })

    it('updates a project due date', function(){
      return client
        .patch('/api/projects/due/1')
        .send({
          due: "2016-11-17"
        })
        .expect(200)
    })

    it('deletes a project', function(){
      return client
        .delete('/api/projects/2')
        .expect(200)
    })

  }); 

  describe('Resources: ', function(){

    var client = null

    beforeEach(function(){
      client = request.agent(app)
    })

    it('adds a resource', function(){
      return client
        .post('/api/resources')
        .send({
          res_name: 'Olaf',
          proj_id: 1,
          company: 'Olaf Corp'
        })
    })

    it('gets all resources for a company', function(){
      return client
        .get('/api/resources/Olaf-Corp')
        .expect(200)
    })

    it("updates a resource's assigned project", function(){
      return client
        .patch('/api/resources/project/1')
        .send({
          proj_id: 2000
        })
        .expect(200)
    })

    it('deletes a resource', function(){
      return client
        .delete('/api/resources/1')
        .expect(200)
    })

  })

  describe('Users model: ', function(){

    var client = null

    beforeEach(function(){
      client = request.agent(app)
    })

    it('adds a new user', function(){
      return client
        .post('/api/users')
        .send({
          gh_name: 'mikemfleming',
          gh_img: 'https://avatars3.githubusercontent.com/u/14914451?v=3&s=460',
          company: 'Overlord'
        })
        .expect(201)
    })

    it('gets a user by their username', function(){
      return client
        .get('/api/users/mikemfleming')
        .expect(200)
    })

    it('updates a user image by username', function(){
      return client
        .patch('/api/users/image/mikemfleming')
        .send({
          gh_img: 'http://siggysparadise.com/wp-content/uploads/2015/12/persian-cat.jpg'
        })
        .expect(200)
    })

    it('updates a user company by username', function(){
      return client
        .patch('/api/users/company/mikemfleming')
        .send({
          company: 'MakerSquare'
        })
        .expect(200)
    })
  })

});
