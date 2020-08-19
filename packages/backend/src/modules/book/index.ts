import { Request, Response } from 'express';
import { list as listBooks } from '/providers/book';

export const list = async (req: Request, res: Response) => {
  const books = await listBooks();
  const payload = JSON.stringify({ books });
  res.send(payload);
};
