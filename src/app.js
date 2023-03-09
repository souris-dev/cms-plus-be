import express from 'express';
import cmsRoute from './routes/cmsRoute.js';
import healthCheckRoute from './routes/healthcheckRoute.js';

const app = express();
app.use(express.json());

const port = process.env.PORT || 8002;

app.use('/', healthCheckRoute);
app.use('/api', cmsRoute);

app.listen(port, () => {
  console.log(`cms-service listening on port ${port}`);
});