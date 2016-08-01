
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users','resources','projects').del()

    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('users').insert({gh_name: 'Boss Hog OutLaw', gh_img: 'https://www.google.com/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&ved=0ahUKEwiv5pnWh6HOAhXFzIMKHaQjDEMQjRwIBw&url=http%3A%2F%2Fdogtime.com%2Fpuppies%2F255-puppies&psig=AFQjCNE8wDCfuxH2Gbpje912fBvO3IeEHw&ust=1470169838315854', company: 'The Goog' }),
        knex('resources').insert({res_name: 'slave1', proj_id: 66, company:'mordor'}),
        knex('projects').insert({proj_name: 'funtime', user_name:'Boss Hog OutLaw' , start: '2015-08-22' , due: '2015-08-22' , status: 'forever'})
      ]);
    });
};
