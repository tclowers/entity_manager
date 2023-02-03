import { Request, Response } from 'express';
import { 
    fetch as fetchEntity,
} from '/providers/entity';

import { 
    create as createResource,
} from '/providers/resource';


export const create = async (req: Request, res: Response) => {
    const entityID = req.params.entityID;
    const resource = req.body;
    console.log("creating resource: ", resource);
    const entity = await fetchEntity(entityID);

    const result = await createResource(entity, resource);
    const payload = JSON.stringify(result);
    res.send(payload);
};

// export const fetch = async (req: Request, res: Response) => {
//     const entityId = req.params.entityId;
//     const result = await fetchEntity(entityId);
//     const payload = JSON.stringify(result);
//     res.send(payload);
// };

// export const list = async (req: Request, res: Response) => {
//     const result = await listEntities();
//     const payload = JSON.stringify(result);
//     res.send(payload);
// };

// export const destroy = async (req: Request, res: Response) => {
//     const entityId = req.params.entityId;
//     const result = await destroyEntity(entityId);
//     const payload = JSON.stringify(result);
//     res.send(payload);
// };
  

// export const update = async (req: Request, res: Response) => {
//     const entityId = req.params.entityId;
//     const entity = req.body;
//     const result = await updateEntity(entityId, entity);
//     const payload = JSON.stringify(result);
//     res.send(payload);
// };