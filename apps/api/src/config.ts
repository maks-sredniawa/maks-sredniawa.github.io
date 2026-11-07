import Type, { type Static } from 'typebox';
import Value from 'typebox/value';

const logLevels = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'] as const;

const ConfigSchema = Type.Object({
  HOST: Type.String({ default: '127.0.0.1' }),
  PORT: Type.Integer({ minimum: 1, maximum: 65535, default: 3000 }),
  LOG_LEVEL: Type.Enum(logLevels, { default: 'info' }),
});

export type Config = Static<typeof ConfigSchema>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const { HOST, PORT, LOG_LEVEL } = env;
  const raw = Value.Default(ConfigSchema, { HOST, PORT, LOG_LEVEL });
  return Value.Parse(ConfigSchema, Value.Convert(ConfigSchema, raw));
}
