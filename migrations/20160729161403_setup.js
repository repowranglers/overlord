
exports.up = function(knex, Promise) {
  return Promise.all([
  	knex.schema.createTable('users', function(table){
  		table.increments('user_id').primary();
  		table.string('gh_name').unique();
  		table.string('gh_img');
  		table.string('company');
  	}),
  	knex.schema.createTable('projects', function(table){
  		table.increments('project_id').primary();
  		table.string('proj_name').unique();
  		table.string('user_name');
  		table.date('start');
  		table.date('due');
  		table.string('status');
      table.string('description');
  	}),
  	knex.schema.createTable('resources', function(table){
  		table.increments('res_id').primary();
  		table.string('res_name').unique();;
  		table.integer('proj_id');
  		table.string('company');
  	}),
    knex.schema.createTable('stories', function(table){
      table.increments('story_id').primary();
      table.string('title');
      table.integer('proj_id');
      table.string('description');
      table.string('status');
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
  	knex.schema.dropTable('users'),
  	knex.schema.dropTable('projects'),
  	knex.schema.dropTable('resources'),
    knex.schema.dropTable('stories')
  ])
};
