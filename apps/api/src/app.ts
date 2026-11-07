import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import Fastify, { type FastifyServerOptions } from 'fastify';
import { healthRoutes } from './routes/health';

export function buildApp(options: FastifyServerOptions = {}) {
  const app = Fastify(options).withTypeProvider<TypeBoxTypeProvider>();
  app.register(healthRoutes);
  return app;
}

export type App = ReturnType<typeof buildApp>;
