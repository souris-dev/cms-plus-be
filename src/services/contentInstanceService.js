import models from '../../database/models/index.js';
const { Field, InstanceData, ContentInstance } = models;

import { ServerError } from '../utils/errors.js';
import contentTypeService from './contentTypeService.js';

/**
 * @typedef InstanceDataEntry
 * @type {object}
 * @property {string} fieldName
 * @property {string} value
 */

/**
 * @typedef ContentInstanceInfo
 * @type {object}
 * @property {number} contentTypeId
 * @property {string | undefined} contentTypeName
 * @property {number | undefined} id
 * @property {InstanceDataEntry[]} data
 */

class ContentInstanceService {
  /**
   * Return instances with data, of content type with ID as contentTypeId.
   * @param {number} contentTypeId 
   * @returns instances of given conten type.
   */
  async getAllInstances(contentTypeId) {
    const contentType = await contentTypeService.getContentTypeOrThrow(contentTypeId);
    const instances = await ContentInstance.findAll({
      where: {
        contentTypeId: contentTypeId,
      }
    });

    /** @type {ContentInstanceInfo[]} */
    const results = await Promise.all(instances.map(async (instanceInfo) => {
      const data = await this.getInstanceWithInstanceId(contentTypeId, instanceInfo.id);
      data.contentTypeName = contentType.name;
      /** @type {ContentInstanceInfo} */
      return data;
    }));

    return results;
  }

  /**
   * Get instance with the given instance ID.
   * @param {numner} contentTypeId
   * @param {number} instanceId 
   */
  async getInstanceWithInstanceId(contentTypeId, instanceId) {
    const contentType = await contentTypeService.getContentTypeOrThrow(contentTypeId);
    const fieldsOfContentType = await contentTypeService.getAllFields(contentTypeId);
    const fieldsIncluded = new Set();

    const data = (await InstanceData.findAll({
      where: {
        instanceId: instanceId
      },
      attributes: ['value'],
      include: {
        model: Field,
        attributes: [['name', 'fieldName']],
        // right outer join:
        required: false,
        right: true
      }
    })).map((elem) => {
      const fieldName = elem.Field.dataValues.fieldName;
      fieldsIncluded.add(fieldName);
      return {
        value: elem.value,
        fieldName: fieldName
      };
    });

    fieldsOfContentType.forEach((field) => {
      if (!fieldsIncluded.has(field.name)) {
        data.push({
          value: '',
          fieldName: field.name
        });
      }
    });

    /** @type {ContentInstanceInfo} */
    return {
      contentTypeId: contentTypeId,
      contentTypeName: contentType.name,
      instanceId: instanceId,
      data: [...data]
    };
  }

  /**
   * Create instance for a content type ID.
   * @param {number} contentTypeId
   * @param {ContentInstanceInfo} instanceData 
   */
  async createInstance(contentTypeId, instanceData) {
    const contentType = await contentTypeService.getContentTypeOrThrow(contentTypeId);
    const contentInstance = await contentType.createContentInstance({ contentTypeId: contentTypeId });
    const instanceId = contentInstance.id;

    for await (const fieldData of instanceData.data) {
      const fieldName = fieldData.fieldName;
      const value = fieldData.value;

      const fieldId = (await Field.findOne({
        where: {
          contentTypeId: contentTypeId,
          name: fieldName
        },
        attributes: ['id']
      }))?.id;

      if (fieldId === null || fieldId === undefined) {
        throw new ServerError('Wrong field name given for the given content type. Bad request.', 422);
      }

      await InstanceData.create({
        value: value,
        instanceId: instanceId,
        fieldId: fieldId
      });
    }

    instanceData.contentTypeId = contentTypeId;
    instanceData.contentTypeName = contentType.name;
    instanceData.id = contentInstance.instanceId;

    return instanceData;
  }

  /**
   * @typedef ModificationInfo
   * @type {object}
   * @property {string} fieldName
   * @property {string} newValue
   */

  /**
   * Modify an instance.
   * @param {number} contentTypeId 
   * @param {number} instanceId 
   * @param {ModificationInfo[]} modificationInfo
   * @returns modified instance.
   */
  async modifyInstance(contentTypeId, instanceId, modificationInfo) {
    // TODO: should make this a transaction
    for await (const modifictionInfoEntry of modificationInfo) {
      const fieldName = modifictionInfoEntry.fieldName;
      const newValue = modifictionInfoEntry.newValue;

      const fieldId = (await Field.findOne({
        where: {
          contentTypeId: contentTypeId,
          name: fieldName
        },
        attributes: ['id']
      }))?.id;
  
      if (fieldId === null || fieldId === undefined) {
        throw new ServerError('Wrong field name given for the given content type. Bad request.', 422);
      }
  
      const instanceData = await InstanceData.findOne({
        where: {
          instanceId: instanceId,
          fieldId: fieldId
        }
      });
  
      instanceData.value = newValue;
      await instanceData.save();
    }

    return await this.getInstanceWithInstanceId(contentTypeId, instanceId);
  }

  /**
   * Delete an instance.
   * @param {number} contentTypeId 
   * @param {number} instanceId 
   * @returns deleted instance.
   */
  async deleteInstance(contentTypeId, instanceId) {
    const instance = await this.getInstanceWithInstanceId(contentTypeId, instanceId);
    await InstanceData.destroy({
      where: {
        instanceId: instanceId
      }
    });

    await ContentInstance.destroy({
      where: {
        contentTypeId: contentTypeId,
        id: instanceId
      }
    });

    return instance;
  }
}

export default new ContentInstanceService();