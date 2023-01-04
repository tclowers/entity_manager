import { sql } from 'slonik';
import { query } from '../database';

export async function options() {
  const sql_code = sql`
        SELECT
            ft.id,
            upper(ft.name) AS label
        FROM field_types ft
        UNION
        SELECT
            e.id,
            upper(e.name) AS label
        FROM entities e
        ORDER BY label
    `;
  const results = await query(sql_code);

  return results.rows;
}