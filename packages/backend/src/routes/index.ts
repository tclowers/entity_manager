import { Router, Request, Response, NextFunction } from 'express';

// import * as books from '/modules/book';
import * as entities from '/modules/entity';
import * as entityFieldTypes from '/modules/entity-field-type';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello Express!');
});

// router.get('/books', books.list);

router.post('/entities', entities.create);
router.get('/entity-field-types-options', entityFieldTypes.options);

