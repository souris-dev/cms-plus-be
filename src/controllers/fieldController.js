import contentTypeService from '../services/contentTypeService.js';
import withErrorHandling from './errorHandler.js';

/**
 * Create a field in a content type.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const createFieldController = withErrorHandling(
  async (req, res) => {
    const contentTypeId = req.params.contentTypeId;
    const newField = await contentTypeService.addField(contentTypeId, req.body);
  
    res.status(201);
    res.json(newField);
  }
);

/**
 * Delete a field in a content type.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const removeFieldController = withErrorHandling(
  async (req, res) => {
    const contentTypeId = req.params.contentTypeId;
    const fieldId = req.params.fieldId;
    const removedField = await contentTypeService.deleteField(contentTypeId, fieldId);
  
    res.status(200);
    res.json(removedField);
  }
);

/**
 * Rename a field in a content type.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const renameFieldController = withErrorHandling(
  async (req, res) => {
    const contentTypeId = req.params.contentTypeId;
    const fieldId = req.params.fieldId;
  
    /** @type {string} */
    const newName = req.body.name;
    const removedField = await contentTypeService.renameField(contentTypeId, fieldId, newName);
  
    res.status(200);
    res.json(removedField);
  }
);

/**
 * List the fields of a content type.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const listContentTypeFieldsController = withErrorHandling(
  async (req, res) => {
    const contentTypeId = req.params.contentTypeId;
    const contentTypeFields = await contentTypeService.getAllFields(contentTypeId);
  
    res.status(200);
    res.json(contentTypeFields);
  }
);