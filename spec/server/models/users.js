import {expect} from 'chai';
import request from 'supertest-as-promised';
import db from '../../../src/server/db';

console.log('##########~USERS~###########')

var app = require('../../../src/server/server.js')

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