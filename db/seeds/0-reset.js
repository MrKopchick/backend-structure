exports.seed = async (knex) => {
  await knex('transaction').del();
  await knex('bet').del();
  await knex('event').del();
  await knex('odds').del();
  await knex('user').del();
};
