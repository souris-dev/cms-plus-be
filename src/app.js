import express from 'express';
import cmsRoute from './routes/cmsRoute.js';
import healthCheckRoute from './routes/healthcheckRoute.js';
//import { checkToken } from './utils/middleware/auth.js';

const app = express();
app.use(express.json());

const port = process.env.PORT || 8003;

app.use('/', healthCheckRoute);
app.use('/api', cmsRoute);

app.listen(port, () => {
  console.log(`cms-service listening on port ${port}`);
});