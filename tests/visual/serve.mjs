// Serves a built folder for the screenshot tests: node serve.mjs <dir> <port>
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const [root = '.', port = '4811'] = process.argv.slice(2);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
};

async function resolve(path) {
  const file = join(root, normalize(decodeURIComponent(path)));
  const info = await stat(file).catch(() => undefined);
  if (info?.isDirectory()) return resolve(join(path, 'index.html'));
  return info ? file : undefined;
}

createServer(async (request, response) => {
  const path = new URL(request.url ?? '/', 'http://localhost').pathname;
  const file = await resolve(path);
  const served = file ?? join(root, '404.html');
  response.writeHead(file ? 200 : 404, {
    'content-type': types[extname(served)] ?? 'application/octet-stream',
  });
  createReadStream(served)
    .on('error', () => response.end())
    .pipe(response);
}).listen(Number(port), '127.0.0.1');
