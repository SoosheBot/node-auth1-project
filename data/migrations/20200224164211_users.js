exports.up = function(knex) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();

        tbl.string('username', 128).index()
            .notNullable();

        tbl.string('password', 128).notNullable();
    });
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('users');
};