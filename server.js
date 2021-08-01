const { CONNECTIONS } = require('./src/config')
const app = require('./src/app')

app.listen(CONNECTIONS.PORT, () => {
  console.log(`Сервер запущен на http://localhost:${CONNECTIONS.PORT}/api`);
});
