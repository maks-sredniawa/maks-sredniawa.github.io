FROM node:26-alpine@sha256:8996bb5821d62a8fd9bb27c1cb07462f3fdce6e47d640c6a881ead0b064ce216
RUN npm install --global pnpm@12.18.0
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000
WORKDIR /app
COPY dist/apps/api .
RUN pnpm install --prod --frozen-lockfile
USER node
EXPOSE 3000
HEALTHCHECK CMD wget -qO- "http://127.0.0.1:$PORT/health" || exit 1
CMD ["node", "main.js"]
