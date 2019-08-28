# express-load-balancer
A simple gui wrapper for the nginx load balancer written in Express.js

## Installation
You must have docker and docker-compose installed in your system.

Ports 80, 443 and 9582 on the server must be free.

Get the docker-compose.yml by running
```bash
wget https://raw.githubusercontent.com/Shreyansh97/express-load-balancer/master/docker-compose.yml -O docker-compose.yml
```

You may themn edit docker-compose.yml and change the username and password environment variables to whatever you want to use as the login credentials for your application. After that run `docker-compose up -d` to get the image and start the container.

You can then access the app on port 9582 using the credentials given in the `docker-compose.yml`. If nothing is mentioned the default username is _admin_ and the default password is _admin_.

## Development
To develop you can clone the repo and run
```bash8
docker-compose -f docker-compose.dev.yml up --abort-on-container-exit
```

You can then freely make changes to the code and any changes to the web will trigger an automatic restart of the server using nodemon.