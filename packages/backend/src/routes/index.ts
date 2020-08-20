import { Router, Request, Response, NextFunction } from 'express';

import * as books from '/modules/book';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello Express!');
});

router.get('/books', books.list);
