import db from '../../../src/server/db.js';


exports.createResource = function(resAttrs) {
    var attrs = Obect.assign({}, resAttrs);

    return db('resources').insert({
        res_name: attrs.res_name,
        proj_id: null,
        company: attrs.company
    })
}

exports.getCompResources = function(company) {
    return db('resources').where('company', company);
}

exports.resourceCurrProject = function(resourceID) {
    return db('resources').where('resourceID', proj_id)
}

exports.deleteResource = function(resourceID) {
    return db('resources').where('resourceID', res_id)
        .delete({
            resourceID: res_id
        })
}

exports.assignResource = function(resourceID, projectID) {
    return db('resources').where('resourceID', res_id)
        .update({
            proj_id: projectID
        })
}

exports.unassignResource = function(resourceID) {
    return db('resources').where('resourceID', res_id)
        .update({
            proj_id: null
        })
}


 
// create a resource
// get a resource by company
// the resource's current project (null if they're free)
// delete a resource
// assign, unassign



// Resources.create = function(resAttrs) {
//   console.log('inside Res create, ' resAttrs);
//   var attrs = Object.assign({}, resAttrs);
//   return new Promise(function(resolve, reject) {
//     return knex.select().from('resources').where({res_name: attrs.res_name})
//     .then(val => {
//       console.log('create resource promise value: ', val);
//       if(val.length === 0) {
//         return knex('resources').returning('res_id').insert({
//           res_name: attrs.res_name,
//           proj_id: null,
//           company: attrs.company
//         })
//         .then(value => {
//             console.log('create resource THEN promise value: ', value);
//             return {res_id: value[0]};
//         })
//       }
//       else {
//         return knex('resources').where({res_name: attrs.res_name})
//             .update({
//                 res_name: attrs.res_name,
//                 proj_id: null,
//                 company: attrs.company
//             }).then(newVal => {
//                 return newVal;
//             })
//       }
//     })
//   });

// }


// Resources.findResByComp = function(company) {
//     return new Promise((resolve, reject) => {
//         return knex.select().from('resources').where({
//           company: company  
//         }).then(value => {
//             console.log("findResByComp value: ", value)
//             if (value.length > 0) {
//                 return value;
//             }
//             return false;
//         })
//     })
// }


// Resources.assignResource = function(resource, project) {
//     // apply proj_id to resource
//     return new Promise((resolve, reject) => {
//         return knex.select().from('resources').where({
//             resource
//         })
//     })
// }


// Resources.isResAvail = function(resource) {
//     // check status of proj_id column
//     // THIS IS WRONG - must be based on proj_id
//     return new Promise((resolve, reject) =>) {
//         return knex.select().from('resources').where({
//             proj_id: proj_id
//         }).then(value => {
//             console.log("isResAvail VALUE: ", value)
//             if (value.length) {
//                 return false;
//             } else {
//                 return true;
//             }
//         })    
//     }
// }


// Resources.unassignResource = function(resource) {
//     // remove proj_id from resource
// }


// Resources.deleteResource = function(resource) {
//     // remove resource from table
// }



