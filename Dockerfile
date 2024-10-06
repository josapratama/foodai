FROM oven/bun:debian

WORKDIR /usr/src/app

COPY . .

RUN bun install && bun prisma generate

# RUN bun run build

# EXPOSE 3000

CMD ["bun", "start"]
