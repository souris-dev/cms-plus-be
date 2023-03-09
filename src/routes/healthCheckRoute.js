import * as express from 'express';
import healthCheckController from '../controllers/healthCheckController.js';

const healthCheckRoute = express.Router();

const HEALTH_CHECK_ROUTE = '/healthcheck';

healthCheckRoute.get(HEALTH_CHECK_ROUTE, healthCheckController);

export default healthCheckRoute;