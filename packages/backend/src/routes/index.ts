import { Router, Request, Response, NextFunction } from 'express';

import * as entities from '/modules/entity';
import * as fieldTypes from '/modules/field-type';
import * as fieldClasses from '/modules/field-class';
import * as resources from '/modules/resource';

export const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello Express!');
});


router.get('/entities', entities.list);
router.get('/entities/:entityId', entities.fetch);
router.post('/entities', entities.create);
router.put('/entities/:entityId', entities.update);
router.delete('/entities/:entityId', entities.destroy);
router.get('/field-types-options', fieldTypes.options);
router.get('/field-classes-options', fieldClasses.options);
router.post('/entities/:entityId/resources', resources.create);
router.get('/entities/:entityId/resources/:resourceId', resources.fetch);
router.get('/entities/:entityId/resources', resources.list);
router.put('/entities/:entityId/resources/:resourceId', resources.update);
router.delete('/entities/:entityId/resources/:resourceId', resources.destroy);

