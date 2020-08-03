import { sql } from 'slonik';
import { query } from '../database';

export async function list() {
    const sql_code = sql`
        SELECT
            title,
            author
        FROM books
    `;
    const results = await query(sql_code);

    return results.rows;
}

/// In the event that database connectivity is not yet setup
/// simply return this object.
// export const list = [
//     {
//         title: 'Harry Potter and the Chamber of Secrets',
//         author: 'J.K. Rowling II',
//     },
//     {
//         title: 'Jurassic Park',
//         author: 'Michael Crichton',
//     },
// ];