import db from '../../../src/server/db.js';


exports.createResource = function(resAttrs) {
    var attrs = Object.assign({}, resAttrs);
    var gif_id = Math.floor(Math.random() * 10) + '.gif'

    return db('resources').insert({
        res_name: attrs.res_name,
        proj_id: 0  ,
        company: attrs.company,
        res_img: gif_id
    })
}

exports.getCompResources = function(company) {
    return db('resources').where('company', company);
}

exports.resourceCurrProject = function(resourceID) {
    return db('resources').where('resourceID', proj_id)
}

exports.deleteResource = function(resourceID) {
    return db('resources').where('res_id', resourceID)
        .del()
}

exports.assignResource = function(resourceID, projectID) {
    return db('resources').where('res_id', resourceID)
        .update('proj_id', projectID)
}

exports.unassignResource = function(resourceID) {
    return db('resources').where('resourceID', res_id)
        .update('proj_id', null)
}