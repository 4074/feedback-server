FROM 4074/pm2-builder:12-alpine-git-sass4.14.1

WORKDIR /web
COPY app/ /web/app/
COPY server/ /web/server/
COPY feedbackjs/ /web/feedbackjs/

WORKDIR /web/app
RUN npm install --registry=https://registry.npm.taobao.org
RUN npm run build
RUN rm -rf node_modules

WORKDIR /web/feedbackjs
RUN npm install --registry=https://registry.npm.taobao.org

WORKDIR /web/server
RUN npm install --registry=https://registry.npm.taobao.org
RUN npm run build
RUN mkdir sdks

EXPOSE 4000

CMD [ "pm2-runtime", "start", "pm2.config.js" ]