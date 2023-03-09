import * as express from 'express';
import { 
  deleteInstanceController, 
  modifyInstanceController 
} from '../controllers/contentInstanceController.js';

import { 
  createContentTypeController,
  getContentTypeController,
  listContentTypesController 
} from '../controllers/contentTypeController.js';

import { 
  createFieldController, 
  removeFieldController, 
  renameFieldController 
} from '../controllers/fieldController.js';

import requestSchemaValidator from '../utils/middleware/requestSchemaValidator.js';

import { 
  createContentTypeSchema, 
  createFieldSchema, 
  createFieldUrlSchema, 
  createInstanceSchema, 
  createInstanceUrlSchema, 
  getContentTypeUrlSchema, 
  modifyInstanceSchema, 
  modifyInstanceUrlSchema, 
  removeFieldUrlSchema, 
  renameFieldSchema, 
  updateContentTypeSchema
} from '../utils/requestSchemas.js';

const cmsRoute = express.Router();

cmsRoute.get('/contentType', listContentTypesController);

cmsRoute.use('/contentTypes/:contentTypeId', requestSchemaValidator({
  reqParamsSchema: getContentTypeUrlSchema,
  patchBodySchema: updateContentTypeSchema,
  putBodySchema: updateContentTypeSchema
}));

cmsRoute.get('/contentTypes/:contentTypeId', getContentTypeController);

cmsRoute.use('/contentType', requestSchemaValidator({ 
  postBodySchema: createContentTypeSchema
}));
cmsRoute.post('/contentType', createContentTypeController);

const FIELD_CREATE_ROUTE = '/contentTypes/:contentTypeId/field';

cmsRoute.use(FIELD_CREATE_ROUTE, requestSchemaValidator({
  reqParamsSchema: createFieldUrlSchema,
  postBodySchema: createFieldSchema
}));
cmsRoute.post(FIELD_CREATE_ROUTE, createFieldController);

const FIELD_RUD_ROUTE = '/contentTypes/:contentTypeId/fields/:fieldName';

cmsRoute.use(FIELD_RUD_ROUTE, requestSchemaValidator({
  reqParamsSchema: removeFieldUrlSchema,
  patchBodySchema: renameFieldSchema,
  putBodySchema: renameFieldSchema,
}));

cmsRoute.patch(FIELD_RUD_ROUTE, renameFieldController);
cmsRoute.put(FIELD_RUD_ROUTE, renameFieldController);
cmsRoute.delete(FIELD_RUD_ROUTE, removeFieldController);

const INSTANCE_CREATE_ROUTE = '/contentTypes/:contentTypeId/instances';

cmsRoute.use(INSTANCE_CREATE_ROUTE, requestSchemaValidator({
  reqParamsSchema: createInstanceUrlSchema,
  postBodySchema: createInstanceSchema
}));

const INSTANCE_RUD_ROUTE = '/contentTypes/:contentTypeId/instance/:instanceId';

cmsRoute.use(INSTANCE_RUD_ROUTE, requestSchemaValidator({
  reqParamsSchema: modifyInstanceUrlSchema,
  patchBodySchema: modifyInstanceSchema,
  putBodySchema: modifyInstanceSchema,
}));

cmsRoute.patch(INSTANCE_RUD_ROUTE, modifyInstanceController);
cmsRoute.put(INSTANCE_RUD_ROUTE, modifyInstanceController);
cmsRoute.delete(INSTANCE_RUD_ROUTE, deleteInstanceController);

export default cmsRoute;