const { Client } = require('pg');
export const client = new Client({
  port: 5433,
  user: 'Velizar',
  password: '123456',
  database: 'Nodey'
});

export async function initDbClient() {
  await client.connect();
}
