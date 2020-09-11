#!/bin/sh

# Wait until prisma is avaliable, and download schemas

# export PRISMA_MANAGEMENT_API_SECRET=***

./docker-scripts/wait-for-it.sh nats-srv:4222

# cd /app

# sleep 10

# npm run start

#!/bin/bash

# prisma deploy

#  cd /prisma 
#  prisma deploy

# go into the project...
 cd /app

 npm run start
