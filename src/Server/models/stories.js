import db from '../../../src/server/db.js';

exports.addStory = function(story){
	return db('stories').insert({
		title: story.title,
		project_id: story.project_id,
		description: story.description,
		status: story.status
	})
}

exports.updateStatus = function(id, status){
	 return db('stories').where('project_id', id)
	 				.update({
	 					status: status
	 				})
}

exports.updateDescription = function(id, description){
	return db('stories').where('project_id', id)
					.update({
						description: description
					})
}

exports.updateTitle = function(sid, title){
	return db('stories').where('project_id', id)
					.update({
						title: title
					})
}

exports.getStories = function(pid){
	return db('stories').where('project_id', id)
}

exports.deleteStory = function(sid){
	return db('stories').where('story_id', id).del()
}