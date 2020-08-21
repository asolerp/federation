#!/bin/sh

# Wait until prisma is avaliable, and download schemas

./docker-scripts/wait-for-it.sh prisma-accounts:4466/accounts/dev -- prisma deploy -e ./dev.env

cd /app

npm run start