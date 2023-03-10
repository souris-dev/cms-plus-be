const requestSchemaValidator = (options) => async (req, res, next) => {
  console.log(req.url);
  const postSchema = options.postBodySchema;
  const patchSchema = options.patchBodySchema;
  const putSchema = options.putBodySchema;

  console.log(Object.keys(options));
  
  const reqParamSchema = options.reqParamSchema;
  const bodyValidators = {
    'POST': async (body) => await postSchema?.validateAsync(body),
    'PUT': async (body) => await putSchema?.validateAsync(body),
    'PATCH': async (body) => await patchSchema?.validateAsync(body)
  };

  try {
    if (Object.keys(bodyValidators).includes(req.method) && req.body) {
      await bodyValidators[req.method](req.body);
    }

    if ((req.params || options.checkReqParams) && reqParamSchema) {
      await reqParamSchema.validateAsync(req.params);
    }
  } catch(err) {
    console.error(err);
    res.status(400);
    res.json({ error: err.message });
    return;
  }

  next();
};

export default requestSchemaValidator;