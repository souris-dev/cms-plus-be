import contentTypeService from '../services/contentTypeService';

/**
 * Create a content type. 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const createContentType = async (req, res) => {
  /** @type {contentTypeService.ContentTypeInfo} */
  const contentTypeInfo = req.body;
  const contentTypeCreated = await contentTypeService.createContentType(contentTypeInfo);

  res.status(201);
  res.json(contentTypeCreated);
};

/**
 * Create a content type. 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const updateContentType = async (req, res) => {
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
};

/**
 * Get all content types. 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const listContentTypes = async (req, res) => {
  const contentTypes = await contentTypeService.getAllContentTypes();

  res.status(200);
  res.json(contentTypes);
};