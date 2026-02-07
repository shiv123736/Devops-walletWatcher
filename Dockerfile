# Stage 1: The Builder Stage
# step 1: The builder stage
FROM node:20-alpine AS builder

# 2 set the workig directory
WORKDIR /app

# 3 Coply the package.json and package-lock.json files to the working directory
COPY package*.json ./

# 4 Install the dependencies
RUN npm i

# 5 Copy the rest of the application code to the working directory
COPY . .

# 6 Generate prisma client
RUN npx prisma generate

#7 Build the typescript code
RUN npm run build

# Stage 2: The Production Stage
# 8 Use a smaller base image for the production stage
FROM node:20-alpine AS runner

# 9 Set the working directory
WORKDIR /app

# 10 Install open SSL for Prisma
RUN apk add --no-cache openssl

# 11 Copy the built application from the builder stage to the production stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules/.prisma ./node_modules/prisma

# 12 Install only production dependencies
RUN npm ci --only=production

# 13 Expose the port that the application will run on
EXPOSE 3000

# 14 Start the application          
CMD [ "node", "dist/server.js" ]

