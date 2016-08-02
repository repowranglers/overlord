import db from '../../../src/server/db.js';

const Resources = module.exports;

Resources.create = function(resAttrs) {
  console.log('inside Res create, ' resAttrs);
  var attrs = Object.assign({}, resAttrs);
  return new Promise(function(resolve, reject) {
    return knex.select().from('resources').where({res_name: attrs.res_name})
    .then(val => {
      console.log('create resource promise value: ', val);
      if(val.length === 0) {
        return knex('resources').returning('res_id').insert({
          res_name: attrs.res_name,
          proj_id: null,
          company: attrs.company
        })
        .then()
      }
    })
  });


}


// create a resource
// get a resource by company
// the resource's current project (null if they're free)
// delete a resource
// assign, unassign




function addUser(userName, password) {
	return hashPassword(password)
		.then(function(hashWord) {
			return knex.select().from('users').where({facebookEmail:userName}).then(function(value){
				console.log("WHAT IS THIS",value)
				if(value.length==0){
					return knex('users').returning('userID').insert({
				username: userName,
				password: hashWord
				}).then(function(value){
					console.log('Valll',value)
					return {userID:value[0]}
			})
				}
				else{
					return knex('users').where({facebookEmail:userName}).update({username:userName,password:hashWord}).then(function(newValue){
						console.log("updateValue",value)
						return value
					})

				}
			})


		})
}
