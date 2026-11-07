import type { FastifyPluginCallbackTypebox } from '@fastify/type-provider-typebox';
import Type from 'typebox';

export const healthRoutes: FastifyPluginCallbackTypebox = (app, _options, done) => {
  app.get(
    '/health',
    { schema: { response: { 200: Type.Object({ status: Type.Literal('ok') }) } } },
    () => ({ status: 'ok' as const }),
  );
  done();
};
