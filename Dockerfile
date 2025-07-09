FROM node:20 AS builder

ENV NODE_ENV=production

WORKDIR /workspace

COPY . .

RUN npm install

RUN npm run build

FROM node:20 AS runner

WORKDIR /workspace

COPY --from=builder /opt/app/.output /workspace

CMD ["node", "./server/index.mjs"]
