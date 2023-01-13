// import { createPool } from 'slonik';
const { Pool } = require('pg');

const { DB_USER, DB_PASS, DB_HOST, DB_DATABASE, DB_PORT } = process.env;

// export const pg_connection = `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_DATABASE}`;

// export const pool = createPool(pg_connection);

// export function query(sql: any) {
//   return pool.connect(async (connection) => {
//     const result = await connection.query(sql);
//     return result;
//   });
// }


export const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_DATABASE,
  password: DB_PASS,
  port: DB_PORT,
})

export async function query(sql: string, values: any[]) {
  try {
    const res = await pool.query(sql, values);
    return res;
  } catch (err) {
    const anyErr = err as any;
    console.log(anyErr.stack);
  }
}