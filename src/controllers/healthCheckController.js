/**
 * Health check.
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
const healthCheckController = (req, res) => {
  res.status(200);
  res.json({ status: 'UP' });
};

export default healthCheckController;