#!/bin/sh

# Wait until prisma is avaliable, and download schemas

# export PRISMA_MANAGEMENT_API_SECRET=***

./docker-scripts/wait-for-it.sh prisma-accounts:4466/accounts/dev -- prisma deploy --env-file ./env.dev

cd /app

npm run start