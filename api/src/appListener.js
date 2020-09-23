const app = require('./app');
const API_PORT = process.env.API_PORT ? process.env.API_PORT : 5000;

app.listen(API_PORT, async () => {
  console.log(`API server is listening at port ${API_PORT}`);
});
