import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('companyAccounts', (table) => {
    table.increments('id').primary();
    table.string('cpfOrCnpj').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
  })
}

export async function down(knex: Knex) {
  
}