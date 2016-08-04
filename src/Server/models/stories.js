import db from '../../../src/server/db.js';

exports.addStory = function(story){
	return db('resources').insert({
		title: story.title,
		project_id: story.project_id,
		description: story.description,
		status: story.status
	})
}

exports.