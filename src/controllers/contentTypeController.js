import contentTypeService from '../services/contentTypeService.js';
import withErrorHandling from './errorHandler.js';

/**
 * Create a content type. 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const createContentTypeController = withErrorHandling(
  async (req, res) => {
    /** @type {import('../services/contentTypeService').ContentTypeInfo} */
    const contentTypeInfo = req.body;
    const contentTypeCreated = await contentTypeService.createContentType(contentTypeInfo);
  
    res.status(201);
    res.json(contentTypeCreated);
  }
);

/**
 * Get a content type by ID. 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const getContentTypeController = withErrorHandling(
  async (req, res) => {
    const contentTypeId = req.params.contentTypeId;
    const contentType = await contentTypeService.getContentTypeOrThrow(contentTypeId);
  
    res.status(200);
    res.json(contentType);
  }
);

/**
 * Create a content type. 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const updateContentTypeController = withErrorHandling(
  async (req, res) => {
    const contentTypeId = req.params.contentTypeId;
  
    /**
     * @typedef ContentTypeUpdateRequestBody
     * @type {object}
     * @property {string} name
     */
  
    /** @type {ContentTypeUpdateRequestBody} */
    const updatedContentType = await contentTypeService.updateName(contentTypeId, req.body.name);
  
    res.status(200);
    res.json(updatedContentType);
  }
);

/**
 * Get all content types. 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const listContentTypesController = withErrorHandling(
  async (req, res) => {
    const contentTypes = await contentTypeService.getAllContentTypes();
  
    res.status(200);
    res.json(contentTypes);
  }
);