// import {expect} from 'chai';
// import request from 'supertest-as-promised';
// import db from '../../../src/server/db';

// console.log('############################################################################################################## we up in here yo')
// db.migrate.latest()

// var app = require('../../../src/server/server.js')

// describe('', function() {

//   describe('Projects:', function(){

//     var client = null

//     beforeEach(function(){      
//       client = request.agent(app)
//     });

//     it('adds a project,', function() {
//       return client
//         .post('/api/projects')
//         .send({
//           proj_name: 'Overlord',
//           user_name: 'mikemfleming',
//           start: '2016-02-22',
//           due: '2016-09-22',
//           status: 'started'
//         }).expect(201)
//     });

//     it('gets a project by username', function(){
//       return client
//         .get('/api/projects/mikemfleming')
//         .expect(200)
//     })

//     it('updates a project status', function(){
//       return client
//         .patch('/api/projects/status/1')
//         .send({
//           status: 'complete'
//         })
//         .expect(200)
//     })

//     it('updates a project start date', function(){
//       return client
//         .patch('/api/projects/start/1')
//         .send({
//           start: "2016-10-31"
//         })
//         .expect(200)
//     })

//     it('updates a project due date', function(){
//       return client
//         .patch('/api/projects/due/1')
//         .send({
//           due: "2016-11-17"
//         })
//         .expect(200)
//     })

//     it('deletes a project', function(){
//       return client
//         .delete('/api/projects/2')
//         .expect(200)
//     })


//   })

// });