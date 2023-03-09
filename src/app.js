import express from 'express';

const app = express();
app.use(express.json());

const port = process.env.PORT || 8002;

app.use('/', () => {});

app.listen(port, () => {
  console.log(`cms-service listening on port ${port}`);
});