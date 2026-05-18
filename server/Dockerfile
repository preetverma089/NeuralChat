FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:20-alpine AS production
WORKDIR /app

RUN addgroup -g 1001 -S nodejs && adduser -S nodeuser -u 1001

COPY --from=base /app/node_modules ./node_modules
COPY . .

RUN chown -R nodeuser:nodejs /app
USER nodeuser

EXPOSE 5000

CMD ["node", "index.js"]
