import { createPool } from 'slonik';

const { DB_USER, DB_PASS, DB_HOST, DB_DATABASE } = process.env;

const pg_connection = `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_DATABASE}`;

export const pool = createPool(pg_connection);

export function query(sql: any) {
  return pool.connect(async (connection) => {
    const result = await connection.query(sql);
    return result;
  });
}
