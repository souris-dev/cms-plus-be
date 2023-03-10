import express from 'express';
import cmsRoute from './routes/cmsRoute.js';
import healthCheckRoute from './routes/healthCheckRoute.js';
import cors from 'cors';
import { checkToken } from './utils/middleware/auth.js';

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8003;

app.use('/', healthCheckRoute);

if (process.env.USE_AUTH) {
  app.use('/api', checkToken, cmsRoute);
}
else {
  app.use('/api', cmsRoute);
}

app.listen(port, () => {
  console.log(`cms-service listening on port ${port}`);
});