import db from '../db.js';

exports.getProjectsByName = function(name){
	return db('projects').where('user_name', name)
}