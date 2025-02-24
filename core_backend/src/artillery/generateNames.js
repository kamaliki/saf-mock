const { faker } = require('@faker-js/faker');

function generateNames(context, events, done) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  context.vars.firstName = firstName;
  context.vars.lastName = lastName;

  return done();
}

module.exports = { generateNames };
