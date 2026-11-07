import { describe, expect, it } from 'vitest';
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

  it('rejects a port out of range', () => {
    expect(() => loadConfig({ PORT: '70000' })).toThrow();
  });
});
