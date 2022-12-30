import { sql } from 'slonik';
import { query } from '../database';
import { v4 as uuidv4 } from 'uuid';
import { EntityField } from '/models/entity-field';
import { Entity } from '/models/entity';


export async function create({ name }: Entity) {
  const id = uuidv4();
  const insert_entity_code = sql`
        INSERT INTO entities (id, name)
          VALUES (${id}, ${name})
    `;
  const results = await query(insert_entity_code);

  return results.rows;
}
