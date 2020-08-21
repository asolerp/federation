#!/bin/sh

# Wait until prisma is avaliable, and download schemas

# ./docker-scripts/wait-for-it.sh accounts:4001

sleep 10

cd /app

npm run start