import { ContentType, Field } from '../../database/models';
import { ServerError } from '../utils/errors';

/**
 * @typedef FieldInfo
 * @type {object}
 * @property {string} name
 */

/**
 * @typedef ContentTypeInfo
 * @type {object}
 * @property {string} name
 * @property {FieldInfo[]} fields
 */

class ContentTypeService {
  /**
   * Get all content types.
   * @returns all content types.
   */
  async getAllContentTypes() {
    const contentTypes = await ContentType.findAll();
    return contentTypes;
  }

  /**
   * Create a content type in DB, along with required fields.
   * @param {ContentTypeInfo} contentType 
   * @returns created object.
   */
  async createContentType(contentType) {
    const contentTypeCreated = await ContentType.create(
      contentType,
      {
        include: Field
      }
    );

    return contentTypeCreated;
  }

  /**
   * Update the name of a content type given its ID.
   * @param {number} contentTypeId 
   * @param {string} newName 
   * @returns updated object.
   */
  async updateName(contentTypeId, newName) {
    const contentType = await ContentType.findOne({
      where: {
        id: contentTypeId
      }
    });

    if (contentType === undefined || contentType === null) {
      throw new ServerError('Content type with given ID not found.', 404);
    }

    contentType.name = newName;

    await contentType.save();
    return contentType;
  }

  /**
   * Return content type given its ID. Throws if not found.
   * @param {number} contentTypeId 
   * @returns contentType with given ID. If not found, throws error.
   */
  async getContentTypeOrThrow(contentTypeId) {
    const contentType = await ContentType.findOne({
      where: {
        id: contentTypeId
      }
    });

    if (contentType === undefined || contentType === null) {
      throw new ServerError('Content type with given ID not found.', 404);
    }
  }

  async throwIfInstancesExist(contentType) {
    const instancesCount = await contentType.countContentInstances();
    
    if (instancesCount > 0) {
      throw new ServerError('This content type has instances - cannot modify fields.', 400);
    }
  }

  /**
   * Delete a field from a content type.
   * @param {number} contentTypeId 
   * @param {string} fieldName 
   */
  async deleteField(contentTypeId, fieldName) {
    const contentType = await this.getContentTypeOrThrow(contentTypeId);
    await this.throwIfInstancesExist(contentType);
    
    const field = await Field.findOne({
      where: {
        name: fieldName,
        contentTypeId: contentTypeId
      }
    });
    
    await contentType.removeField(field);

    return field;
  }

  /**
   * Rename a field in a content type.
   * @param {number} contentTypeId 
   * @param {string} currentFieldName 
   * @param {string} newFieldName 
   * @returns field info of the new field.
   */
  async renameField(contentTypeId, currentFieldName, newFieldName) {
    this.throwIfInstancesExist(await this.getContentTypeOrThrow(contentTypeId));
    
    const field = await Field.findOne({
      where: {
        name: currentFieldName,
        contentTypeId: contentTypeId
      }
    });

    field.name = newFieldName;
    await field.save();

    return field;
  }

  /**
   * Add a new field to a content type.
   * @param {number} contentTypeId 
   * @param {FieldInfo} fieldInfo 
   * @returns field info of newly created field.
   */
  async addField(contentTypeId, fieldInfo) {
    const contentType = await this.getContentTypeOrThrow(contentTypeId);

    const existingFields = await Field.findAll({
      where: {
        name: fieldInfo.name,
        contentTypeId: contentTypeId
      }
    });

    if (existingFields.length > 0) {
      throw new ServerError(`Field named ${fieldInfo.name} exists in content type ${contentType.name}. Cannot create duplicate field.`, 400);
    }

    const newField = await contentType.createField(fieldInfo);
    return newField ?? fieldInfo;
  }
}

export default new ContentTypeService();