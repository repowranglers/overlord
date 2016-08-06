import {expect} from 'chai';
import request from 'supertest-as-promised';
import db from '../../../src/server/db';

console.log('########## ~ Testing Resources...')


var app = require('../../../src/server/server.js')

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
        }).expect(201)
        .expect((res) => {
          console.log(res.body)
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
