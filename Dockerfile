# Gunakan image Bun dari Docker Hub
FROM oven/bun:debian

# Set working directory
WORKDIR /usr/src/app

# Copy semua file ke dalam container
COPY . .

# Install dependencies menggunakan Bun
RUN bun install

# Generate Prisma client
RUN bun prisma generate

# Build aplikasi Next.js untuk produksi
# RUN bun run build

# Expose port 3000
# EXPOSE 3000

# Jalankan aplikasi Next.js
CMD ["bun", "start"]
