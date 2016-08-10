import db from '../../../src/server/db.js';

exports.addStory = function(story){
	return db('stories').insert({
		title: story.title,
		proj_id: story.proj_id,
		description: story.description,
		date_completed: story.date_completed
	})
}

exports.updateStatus = function(s_id, date_completed){
	 return db('stories').where('story_id', s_id)
	 				.update('date_completed', date_completed)
}

exports.updateDescription = function(s_id, description){
	return db('stories').where('story_id', s_id)
					.update('description', description)
}

exports.updateTitle = function(s_id, title){
	return db('stories').where('story_id', s_id)
					.update('title', title)
}

exports.getStories = function(p_id){
	return db('stories').where('proj_id', p_id)
}

exports.deleteStory = function(s_id){
	return db('stories').where('story_id', s_id).del()
}