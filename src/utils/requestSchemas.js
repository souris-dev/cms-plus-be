import Joi from 'joi';

//------------------------------
// Content type schemas
//------------------------------
export const createContentTypeSchema = Joi.object({
  name: Joi.string().min(1).alphanum().required(),
  fields: Joi.array().items(
    Joi.object({
      name: Joi.string().min(1).alphanum().required()
    })
  )
});

export const getContentTypeUrlSchema = Joi.object({
  contentTypeId: Joi.number().required()
});

export const updateContentTypeSchema = Joi.object({
  name: Joi.string().min(1).alphanum().required()
});

export const updateContentTypeUrlSchema = Joi.object({
  contentTypeId: Joi.number().required()
});

//-----------------------------
// Field schemas
//-----------------------------
export const createFieldSchema = Joi.object({
  name: Joi.string().min(1).alphanum().required()
});

export const createFieldUrlSchema = Joi.object({
  contentTypeId: Joi.number().required()
});

export const removeFieldUrlSchema = Joi.object({
  contentTypeId: Joi.number().required(),
  fieldName: Joi.string().min(1).alphanum().required()
});

export const renameFieldUrlSchema = Joi.object({
  contentTypeId: Joi.number().required(),
  fieldName: Joi.string().min(1).alphanum().required()
});

export const renameFieldSchema = Joi.object({
  name: Joi.string().min(1).alphanum().required()
});

//-----------------------------
// Instance schemas
//-----------------------------
export const createInstanceSchema = Joi.object({
  contentTypeId: Joi.number(),
  data: Joi.array().items(
    Joi.object({
      fieldName: Joi.string().min(1).alphanum().required(),
      value: Joi.string().required()
    })
  )
});

export const createInstanceUrlSchema = Joi.object({
  contentTypeId: Joi.number().required()
});

export const modifyInstanceUrlSchema = Joi.object({
  contentTypeId: Joi.number().required(),
  instanceId: Joi.number().required()
});

export const modifyInstanceSchema = Joi.object({
  fieldName: Joi.string().min(1).alphanum().required(),
  newValue: Joi.string().required()
});

export const deleteInstanceUrlSchema = Joi.object({
  contentTypeId: Joi.number().required(),
  instanceId: Joi.number().required()
});

export const getInstanceUrlSchema = Joi.object({
  contentTypeId: Joi.number().required(),
  instanceId: Joi.number().required()
});
