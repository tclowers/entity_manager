import { Request, Response } from 'express';
import { options as fieldClassList} from '/providers/field-class';

export const options = async (req: Request, res: Response) => {
  const fieldClasses = await fieldClassList();
  const payload = JSON.stringify(fieldClasses);
  res.send(payload);
};
