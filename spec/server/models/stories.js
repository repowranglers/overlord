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
				project_id: 1,
				description: 'More detailed information about why we would want them to do this',
				status: 'open'
			}).expect(201)
	})

	it('updates a story status', function(){
		return client
			.post('/api/stories/status')
			.send({
				status: 'closed'
			}).expect(200)
	})

	it('updates a story description', function(){
		return client
			.post('/api/stories/description')
			.send({
				description: 'Even more detailed information about why we would want them to do this'
			}).expect(200)
	})

	it('updates a story title', function(){
		return client
			.post('/api/stories/status')
			.send({
				title: 'Users can add even more stories'
			}).expect(200)
	})

	it('deletes a story', function(){
		return client
			.delete('/api/resources')
			.expect(200)
	})

})