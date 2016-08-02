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
        .then(value => {
            console.log('create resource THEN promise value: ', value);
            return {res_id: value[0]};
        })
      }
      else {
        return knex('resources').where({res_name: attrs.res_name})
            .update({
                res_name: attrs.res_name,
                proj_id: null,
                company: attrs.company
            }).then(newVal => {
                return newVal;
            })
      }
    })
  });

}

Resources.findResByComp = function(company) {
    return knex.select().from('resources').where({
      company: company  
    }).then(value => {
        if (value.length > 0) {
            return value;
        }
        return false;
    })
}

Resources.isResAvail = function(resource) {

}

Resources.deleteResource = function(resource) {

}

Resources.assignResource = function(resource) {

}

Resources.unassignResource = function(resource) {
    
}


// create a resource
// get a resource by company
// the resource's current project (null if they're free)
// delete a resource
// assign, unassign


 var findUserByID = function(ID) {
    console.log("FINDUSERID", ID)
    return (db.collection('FBusers').find({
        facebookID : ID
    }) || db.collection('IGusers').find({
        instagramID : ID
    })).then(function(value) {
        console.log('valueIDID',value)
        if (value.length > 0) {
            return value[0];
        }
        return false;
    })
}

var findUserByID = function(ID) {
    return knex.select().from('users').where({
        userID: ID
    }).then(function(value) {
        //console.log('value',value)
        if (value.length > 0) {
            return value[0];
        }
        return false;
    })
}



// function addUser(userName, password) {
// 	return hashPassword(password)
// 		.then(function(hashWord) {
// 			return knex.select().from('users').where({facebookEmail:userName}).then(function(value){
// 				console.log("WHAT IS THIS",value)
// 				if(value.length==0){
// 					return knex('users').returning('userID').insert({
// 				username: userName,
// 				password: hashWord
// 				}).then(function(value){
// 					console.log('Valll',value)
// 					return {userID:value[0]}
// 			})
// 				}
// 				else{
// 					return knex('users').where({facebookEmail:userName}).update({username:userName,password:hashWord}).then(function(newValue){
// 						console.log("updateValue",value)
// 						return value
// 					})

// 				}
// 			})


// 		})
// }
