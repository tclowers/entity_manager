import { Request, Response } from 'express';
import { create as createEntity } from '/providers/entity';

export const create = async (req: Request, res: Response) => {
    const entity = req.body;
    console.log("creating entity: ", entity);
    const result = await createEntity(entity);
    const payload = JSON.stringify(result);
    res.send(payload);
};
