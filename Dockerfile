FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Step 1. Rebuild the source code only when needed
FROM base AS builder

WORKDIR /app

WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Omit --production flag for TypeScript devDependencies
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  # Allow install without lockfile, so example works even without Node.js installed locally
  else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && yarn install; \
  fi

# Environment variables must be present at build time
# https://github.com/vercel/next.js/discussions/14030
ARG NEXT_PUBLIC_BASE_MAP_TYPE
ENV NEXT_PUBLIC_BASE_MAP_TYPE=${NEXT_PUBLIC_BASE_MAP_TYPE}

ARG NEXT_PUBLIC_BASE_MAP_TILE_KEY
ENV NEXT_PUBLIC_BASE_MAP_TILE_KEY=${NEXT_PUBLIC_BASE_MAP_TILE_KEY}

ARG NEXT_PUBLIC_WEB_MERCATOR_MAP_ENGINE
ENV NEXT_PUBLIC_WEB_MERCATOR_MAP_ENGINE=${NEXT_PUBLIC_WEB_MERCATOR_MAP_ENGINE}

ARG NEXT_PUBLIC_CGCS2000_MAP_ENGINE
ENV NEXT_PUBLIC_CGCS2000_MAP_ENGINE=${NEXT_PUBLIC_CGCS2000_MAP_ENGINE}

ARG NEXT_PUBLIC_BACKEND_ENDPOINT
ENV NEXT_PUBLIC_BACKEND_ENDPOINT=${NEXT_PUBLIC_BACKEND_ENDPOINT}

# Next.js collects completely anonymous telemetry data about general usage. Learn more here: https://nextjs.org/telemetry
# Uncomment the following line to disable telemetry at build time
ENV NEXT_TELEMETRY_DISABLED 1

# Build Next.js based on the preferred package manager
RUN \
  if [ -f yarn.lock ]; then yarn build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then pnpm build; \
  else npm run build; \
  fi

# Note: It is not necessary to add an intermediate step that does a full copy of `node_modules` here

# Step 2. Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder /app/public ./public

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Environment variables must be redefined at run time
ARG NEXT_PUBLIC_BASE_MAP_TYPE
ENV NEXT_PUBLIC_BASE_MAP_TYPE=${NEXT_PUBLIC_BASE_MAP_TYPE}

ARG NEXT_PUBLIC_BASE_MAP_TILE_KEY
ENV NEXT_PUBLIC_BASE_MAP_TILE_KEY=${NEXT_PUBLIC_BASE_MAP_TILE_KEY}

ARG NEXT_PUBLIC_WEB_MERCATOR_MAP_ENGINE
ENV NEXT_PUBLIC_WEB_MERCATOR_MAP_ENGINE=${NEXT_PUBLIC_WEB_MERCATOR_MAP_ENGINE}

ARG NEXT_PUBLIC_CGCS2000_MAP_ENGINE
ENV NEXT_PUBLIC_CGCS2000_MAP_ENGINE=${NEXT_PUBLIC_CGCS2000_MAP_ENGINE}

ARG NEXT_PUBLIC_BACKEND_ENDPOINT
ENV NEXT_PUBLIC_BACKEND_ENDPOINT=${NEXT_PUBLIC_BACKEND_ENDPOINT}

# Uncomment the following line to disable telemetry at run time
# ENV NEXT_TELEMETRY_DISABLED 1

# Note: Don't expose ports here, Compose will handle that for us

CMD ["node", "server.js"]