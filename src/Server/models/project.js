import db from '../db.js';

exports.getProjectsByName = function(name){
	return db('projects').where('user_name', name)
}

exports.addProject = function(incomingAttrs){
	//avoid mutation of the incomming object
	var attrs = Object.assign({}, incomingAttrs);
	console.log('yo', attrs.proj_name)
	console.log(attrs.user_name)
	console.log(attrs.start)
	return db('projects').insert({
    proj_name: attrs.proj_name,
    user_name: attrs.user_name,
    start: attrs.start,
    due: attrs.due,
    status: 'not yet started'
  })
}