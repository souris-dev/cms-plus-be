const withErrorHandling = (controllerFunction) => {
  return async (req, res) => {
    try {
      await controllerFunction(req, res);
    } catch (err) {
      console.error(err);
      res.status(err.code || 500);
      res.json({ error: err.message || 'Internal server error' });
    }
  };
};

export default withErrorHandling;