
export const up =  function(knex) {
    return knex.schema
        .createTable("person", function (table) {
            table.increments(); // integer id
            table.string('nickname');
            table.string('fullname');
            table.string('description');
        })
        .createTable("person_films", function (table) {
            table.increments(); // integer id
            table.string('title');
            table.string('description');
            table.string('release_date').nullable();
            table.integer('person_id').unsigned()
            table.foreign('person_id').references('person.id')
        })
        .createTable("person_vehicles", function (table) {
            table.increments(); // integer id
            table.string('name');
            table.string('description');
            table.string("year_of_production").nullable();
            table.string("speed").nullable();
            table.integer('person_id').unsigned()
            table.foreign('person_id').references('person.id')
        })
        .createTable("person_starships", function (table) {
            table.increments(); // integer id
            table.string('name');
            table.string("year_of_production").nullable();
            table.string('description').nullable();
            table.string("speed").nullable();
            table.integer('person_id').unsigned()
            table.foreign('person_id').references('person.id')
        })
        .createTable("person_planets", function (table) {
            table.increments(); // integer id
            table.string('name').nullable();
            table.string('description').nullable();
            table.string('weight').nullable();
            table.string('orbit_diameter').nullable();
            table.string("radius").nullable();
            table.string("area").nullable();
            table.string("density").nullable();
            table.integer('person_id').unsigned()
            table.foreign('person_id').references('person.id')
        })
};

export const down =  function(knex) {
  
};

export const config = { transaction: false };