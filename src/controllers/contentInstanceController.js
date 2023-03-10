import contentInstanceService from '../services/contentInstanceService.js';
import withErrorHandling from './errorHandler.js';

/**
 * Create an instance of a content type given its content type ID.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const createInstanceController = withErrorHandling(
  async (req, res) => {
    const contentTypeId = req.params.contentTypeId;

    /** @type {import('../services/contentInstanceService').ContentInstanceInfo} */
    const creationInfo = req.body;
    creationInfo.contentTypeId = contentTypeId;

    const contentInstance = await contentInstanceService.createInstance(contentTypeId, creationInfo);

    res.status(200);
    res.json(contentInstance);
  });

/**
 * Modify an instance given its content type ID and instance ID.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const modifyInstanceController = withErrorHandling(
  async (req, res) => {
    const contentTypeId = req.params.contentTypeId;
    const instanceId = req.params.instanceId;
  
    /**
     * @typedef ModifyInstanceRequestBody
     * @type {object}
     * @property {string} fieldName
     * @property {string} newValue
     */
    /** @type {ModifyInstanceRequestBody} */
    const modificationInfo = req.body;
  
    const modifiedInstance = await contentInstanceService
      .modifyInstance(contentTypeId, instanceId, modificationInfo.fieldName, modificationInfo.newValue);
  
    res.status(200);
    res.json(modifiedInstance);
  }
);

/**
 * Get an instance given its content type ID and instance ID.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const getInstanceController = withErrorHandling(
  async (req, res) => {
    const contentTypeId = req.params.contentTypeId;
    const instanceId = req.params.instanceId;
  
    const instance = await contentInstanceService.getInstanceWithInstanceId(contentTypeId, instanceId);
  
    res.status(200);
    res.json(instance);
  }
);

/**
 * Delete an instance given its content type ID and instance ID.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
export const deleteInstanceController = withErrorHandling(
  async (req, res) => {
    const contentTypeId = req.params.contentTypeId;
    const instanceId = req.params.instanceId;
  
    const instance = await contentInstanceService.deleteInstance(contentTypeId, instanceId);
  
    res.status(200);
    res.json(instance);
  }
);
