import { buildApp } from './app';
import { loadConfig } from './config';

const config = loadConfig();
const app = buildApp({ logger: { level: config.LOG_LEVEL } });

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => {
    app.log.info({ signal }, 'shutting down');
    void app.close();
  });
}

await app.listen({ host: config.HOST, port: config.PORT });
