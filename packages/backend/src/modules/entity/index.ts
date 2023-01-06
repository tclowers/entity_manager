import { Request, Response } from 'express';
import { create as createEntity, fetch as fetchEntity } from '/providers/entity';

export const create = async (req: Request, res: Response) => {
    const entity = req.body;
    console.log("creating entity: ", entity);
    const result = await createEntity(entity);
    const payload = JSON.stringify(result);
    res.send(payload);
};

export const fetch = async (req: Request, res: Response) => {
    const entityId = req.params.entityId;
    const result = await fetchEntity(entityId);
    const payload = JSON.stringify(result);
    res.send(payload);
};
  