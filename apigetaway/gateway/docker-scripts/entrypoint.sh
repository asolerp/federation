#!/bin/sh

# Wait until prisma is avaliable, and download schemas

./docker-scripts/wait-for-it.sh -t 10 accounts:4001 matches:4002 phone-verification:4003

sleep 20

cd /app

npm run start