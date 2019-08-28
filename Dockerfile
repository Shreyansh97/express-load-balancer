FROM nginx:1.17.3

# installing dependencies for nodejs
RUN apt-get update
RUN apt-get install -y curl 

# installing nodejs
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash -
RUN apt-get install -y nodejs

RUN mkdir /usr/src/conf -p
COPY . /usr/src/
WORKDIR /usr/src/
COPY nginx.conf /etc/nginx/conf.d/

# installing web app dependencies
WORKDIR /usr/src/web/
RUN npm install

ENV USERNAME=admin
ENV PASSWORD=admin
ENV NODE_ENV=production

EXPOSE 9582
EXPOSE 80
EXPOSE 443

CMD [ "node", "index.js", "&&", "nginx", "-g", "daemon off;" ]