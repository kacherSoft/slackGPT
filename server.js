const express = require('express');
const apiRoutes = require('./routes/apiRoutes');

const app = express();
app.use(require('./middlewares/contentCheck'));

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

app.use('/api', apiRoutes);

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
  const actualPort = server.address().port;
  console.log(`Server is running on port ${actualPort}`);
});
