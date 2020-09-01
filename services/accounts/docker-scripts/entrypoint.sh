#!/bin/sh

# Wait until prisma is avaliable, and download schemas

# export PRISMA_MANAGEMENT_API_SECRET=***

./docker-scripts/wait-for-it.sh prisma-accounts:4466/accounts/dev -- prisma deploy --force --env-file ./env.dev

# cd /app

# npm run start

#!/bin/bash

# prisma deploy

# cd /app/database 
# prisma deploy

cd /app
# go into the project...

 npm run start
