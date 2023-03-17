import { Request, Response } from 'express';
import { FieldClass } from '/models/field-class';
import { FieldType } from '/models/field-type';
import { Resource } from '/models/resource';
import { Entity } from '/models/entity';
import { EntityField } from '/models/entity-field';
import { 
    fetch as fetchEntity,
} from '/providers/entity';

import { 
    create as createResource,
} from '/providers/resource';

type ResourceField = {
    id?: string;
    name: string;
    fieldValue: any;
    value_function: string;
    field_type_id?: string;
    field_class_id?: string;
}

const mergeResourceFields = ({fields: entityFields}: Entity, { fields: resourceFields }: Resource)  => {
    return entityFields.map( (field: EntityField) => {
        const fValue = resourceFields[ String(field.id) ];
        const rField: ResourceField = {
            ...field,
            fieldValue: fValue
        }
        return rField;
    });
}


export const create = async (req: Request, res: Response) => {
    const entityID = req.params.entityID;
    const resource = req.body;
    console.log("creating resource: ", resource);
    console.log("creating resource with fields: ", resource.fields);
    const entity = await fetchEntity(entityID);

    const resourceFields = mergeResourceFields(entity, resource);
    console.log("resourceFields: %", resourceFields);


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