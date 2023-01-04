import { Router, Request, Response, NextFunction } from 'express';

// import * as books from '/modules/book';
import * as entities from '/modules/entity';
import * as fieldTypes from '/modules/field-type';
import * as fieldClasses from '/modules/field-class';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello Express!');
});

// router.get('/books', books.list);

router.post('/entities', entities.create);
router.get('/field-types-options', fieldTypes.options);
router.get('/field-classes-options', fieldClasses.options);

