import db from '../db'

exports.addUser = function(user){
	console.log('in users.js###########################', user)
	return db('users').insert({
			gh_name: user.gh_name,
			gh_img: user.gh_img,
			company: user.company
		})
}

exports.updateUser = function(user){

}