FROM public.ecr.aws/docker/library/node:22

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .

CMD ["npx", "nodemon"]
