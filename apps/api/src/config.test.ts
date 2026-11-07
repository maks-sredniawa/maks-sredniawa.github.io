import { describe, expect, expectTypeOf, it } from 'vitest';
import { loadConfig } from './config';

describe('loadConfig', () => {
  it('falls back to local defaults', () => {
    expect(loadConfig({})).toEqual({ HOST: '127.0.0.1', PORT: 3000, LOG_LEVEL: 'info' });
  });

  it('reads the environment', () => {
    expect(loadConfig({ HOST: '0.0.0.0', PORT: '8080', LOG_LEVEL: 'debug' })).toEqual({
      HOST: '0.0.0.0',
      PORT: 8080,
      LOG_LEVEL: 'debug',
    });
  });

  it('types the log level as one of the levels', () => {
    expectTypeOf(loadConfig({}).LOG_LEVEL).toEqualTypeOf<
      'fatal' | 'error' | 'warn' | 'info' | 'debug' | 'trace' | 'silent'
    >();
  });

  it('rejects an unknown log level', () => {
    expect(() => loadConfig({ LOG_LEVEL: 'verbose' })).toThrow();
  });

  it('rejects a port out of range', () => {
    expect(() => loadConfig({ PORT: '70000' })).toThrow();
  });
});
