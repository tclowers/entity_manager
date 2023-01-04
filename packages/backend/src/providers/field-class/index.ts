import { sql } from 'slonik';
import { query } from '../database';

export async function options() {
  const sql_code = sql`
        SELECT
            fc.id,
            upper(fc.name) AS label
        FROM field_classes fc
    `;
  const results = await query(sql_code);

  return results.rows;
}