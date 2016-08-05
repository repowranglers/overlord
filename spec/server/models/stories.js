import {expect} from 'chai';
import request from 'supertest-as-promised';
import db from '../../../src/server/db';

console.log('########## ~ Testing Stories...')

var app = require('../../../src/server/server.js')

describe('Stories: ', function(){

	var client = null

	beforeEach(function(){
		client = request.agent(app)
	})

	it('adds a story', function(){
		return client
			.post('/api/stories')
			.send({
				title: 'Users can add stories',
				proj_id: 1,
				description: 'More detailed information about why we would want them to do this',
				status: 'open'
			}).expect(201)
	})

	it('updates a story status', function(){
		return client
			.patch('/api/stories/status/1')
			.send({
				status: 'closed'
			}).expect(200)
			.expect((res) => {
				expect(res.body).to.be.a.number
			})
	})

	it('updates a story description', function(){
		return client
			.patch('/api/stories/description/1')
			.send({
				description: 'Even more detailed information about why we would want them to do this'
			}).expect(200)
			.expect((res) => {
				expect(res.body).to.be.a.number
			})
	})

	it('updates a story title', function(){
		return client
			.patch('/api/stories/title/1')
			.send({
				title: 'Users can add even more stories'
			}).expect(200)
			.expect((res) => {
				expect(res.body).to.be.a.number
			})
	})

	it('gets a story by project_id', function(){
		return client
			.get('/api/stories/1')
			.expect(200)
			.expect(function(res){
				expect(res.body[0].title).to.equal('Users can add even more stories')
			})
	})

	it('deletes a story', function(){
		return client
			.delete('/api/stories/config/1')
			.expect(200)
			.expect((res) => {
				expect(res.body).to.be.a.number
			})
	})

})