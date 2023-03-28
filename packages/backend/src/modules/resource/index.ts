import { Request, Response } from 'express';
import { FieldClass } from '/models/field-class';
import { FieldType } from '/models/field-type';
import { FieldTypes } from '/constants/field-types';
import { FieldClasses } from '/constants/field-classes';
import { Resource } from '/models/resource';
import { ResourceField } from '/models/resource-field';
import { Entity } from '/models/entity';
import { EntityField } from '/models/entity-field';
import { 
    fetch as fetchEntity,
} from '/providers/entity';
import { 
    create as createResource,
    list as listResources,
    fetch as fetchResource,
    update as updateResource,
    destroy as destroyResource,
} from '/providers/resource';
import { evaluateResource } from '/api/logic-engine';


const mergeResourceFields = ({fields: entityFields}: Entity, { fields: resourceFields }: Resource)  => {
    return entityFields.map( (field: EntityField) => {
        const fValue = field.field_type_id == FieldTypes.Integer && field.field_class_id != FieldClasses.Derived ? Number(resourceFields[ String(field.id) ])  : resourceFields[ String(field.id) ];

        const rField: ResourceField = {
            ...field,
            value_function: field.value_function.replace(/^'|'$/g, ''),
            fieldValue: fValue
        }
        return rField;
    });
}


export const create = async (req: Request, res: Response) => {
    const entityId = req.params.entityId;
    const resource = req.body;

    const entity = await fetchEntity(entityId);

    const resourceFields = mergeResourceFields(entity, resource);

    const evaluatedFields = await evaluateResource(resourceFields);

    const result = await createResource(entity, evaluatedFields.result);
    const payload = JSON.stringify(result);
    res.send(payload);
};

export const fetch = async (req: Request, res: Response) => {
    const entityId = req.params.entityId;
    const resourceId = req.params.resourceId;

    const entity = await fetchEntity(entityId);
    const result = await fetchResource(entity, resourceId);
    const payload = JSON.stringify(result);
    res.send(payload);
};

export const list = async (req: Request, res: Response) => {
    const entityId = req.params.entityId;
    const entity = await fetchEntity(entityId);

    const result = await listResources(entity);
    const payload = JSON.stringify(result);
    res.send(payload);
};

export const destroy = async (req: Request, res: Response) => {
    const entityId = req.params.entityId;
    const resourceId = req.params.resourceId;
    const entity = await fetchEntity(entityId);
    const result = await destroyResource(entity, resourceId);
    const payload = JSON.stringify(result);
    res.send(payload);
};

export const update = async (req: Request, res: Response) => {
    const entityId = req.params.entityId;
    const resourceId = req.params.resourceId;
    const resource = req.body;

    const entity = await fetchEntity(entityId);

    const resourceFields = mergeResourceFields(entity, resource);

    const evaluatedFields = await evaluateResource(resourceFields);

    const result = await updateResource(entity, resourceId, evaluatedFields.result);
    const payload = JSON.stringify(result);
    res.send(payload);
}