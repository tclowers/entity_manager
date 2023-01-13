import { Request, Response } from 'express';
import { 
    create as createEntity,
    fetch as fetchEntity,
    list as listEntities,
    destroy as destroyEntity,
    update as updateEntity
} from '/providers/entity';

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

export const list = async (req: Request, res: Response) => {
    const result = await listEntities();
    const payload = JSON.stringify(result);
    res.send(payload);
};

export const destroy = async (req: Request, res: Response) => {
    const entityId = req.params.entityId;
    const result = await destroyEntity(entityId);
    const payload = JSON.stringify(result);
    res.send(payload);
};
  

export const update = async (req: Request, res: Response) => {
    const entityId = req.params.entityId;
    const entity = req.body;
    const result = await updateEntity(entityId, entity);
    const payload = JSON.stringify(result);
    res.send(payload);
};