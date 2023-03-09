import contentTypeService from '../services/contentTypeService';

/**
 * Create a field in a content type.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const createFieldController = async (req, res) => {
  const contentTypeId = req.params.contentTypeId;
  const newField = await contentTypeService.addField(contentTypeId, req.body);

  res.status(201);
  res.json(newField);
};

/**
 * Delete a field in a content type.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const removeFieldController = async (req, res) => {
  const contentTypeId = req.params.contentTypeId;
  const fieldName = req.params.fieldName;
  const removedField = await contentTypeService.deleteField(contentTypeId, fieldName);

  res.status(200);
  res.json(removedField);
};

/**
 * Rename a field in a content type.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const renameFieldController = async (req, res) => {
  const contentTypeId = req.params.contentTypeId;
  const fieldName = req.params.fieldName;

  /** @type {string} */
  const newName = req.body.name;
  const removedField = await contentTypeService.renameField(contentTypeId, fieldName, newName);

  res.status(200);
  res.json(removedField);
};
