#!/bin/sh

# Wait until prisma is avaliable, and download schemas

./docker-scripts/wait-for-it.sh -t 20 accounts:4001 events:4002

sleep 20

cd /app

npm run start