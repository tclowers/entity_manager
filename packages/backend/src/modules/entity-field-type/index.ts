import { Request, Response } from 'express';
import { options as fieldTypeList} from '/providers/entity-field-type';

export const options = async (req: Request, res: Response) => {
  const fieldTypes = await fieldTypeList();
  const payload = JSON.stringify(fieldTypes);
  res.send(payload);
};
