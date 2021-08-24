# STAGE-1
# Install dependencies & build
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
FROM node:14-alpine AS build

WORKDIR /app
ADD . /app

RUN apk add --no-cache libc6-compat
RUN ls -alh
RUN yarn install 
RUN yarn build

# STAGE-2
# Production image, copy all the files and run next
FROM node:14.17.0-alpine

WORKDIR /app

ENV ENV NODE_OPTIONS="--max_old_space_size=1024"

RUN apk add busybox-extras curl wget
RUN addgroup -g 1001 -S nodejs
RUN adduser -u 1001 -S nodejs -G nodejs

COPY --chown=nodejs:nodejs --from=build /app /app
USER nodejs
CMD ["yarn", "start"]
