
exports.up = function(knex, Promise) {
  return Promise.all([
  	knex.schema.createTable('users', function(table){
  		table.increments('user_id').primary();
  		table.string('gh_name');
  		table.string('gh_img');
  		table.string('company');
  	}),
  	knex.schema.createTable('projects', function(table){
  		table.increments('project_id').primary();
  		table.string('proj_name');
  		table.integer('mgr_id');
  		table.date('start');
  		table.date('due');
  		table.string('status');
  	}),
  	knex.schema.createTable('resources', function(table){
  		table.increments('res_id').primary();
  		table.string('res_name');
  		table.integer('proj_id');
  		table.string('company');
  	}),
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTable('users'),
  	knex.schema.dropTable('projects'),
  	knex.schema.dropTable('resources')
  ])
};
