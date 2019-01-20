#!/bin/bash

# getting user input
read -p 'Port to run app: ' port
read -p 'Username: ' user
read -sp 'Password: ' pass
echo ""
read -sp 'Confirm Password: ' confpass
echo ""

if [ $pass != $confpass ]
then
  echo "Passwords do not match"
  exit 1
fi

# writing files to node environment variables
cat > web/.env <<EOL
PORT=$port
USERNAME=$user
PASSWORD=$pass
EOL

# installations
# 
# installing curl
apt install curl

# adding nodejs 10.x to apt and updating apt
curl -sL https://deb.nodesource.com/setup_10.x | -E bash -

# installing nginx
apt install nginx

# installing nodejs
apt install -y nodejs

# installing pm2 to run web application
npm install -g pm2@latest

pwd=`pwd`
config_dir="$pwd/conf"
# creating setup configurations
mkdir $config_dir -p
chmod 777 $config_dir
cat > /etc/nginx/conf.d/express-load-balancer.nginx.conf <<EOL
include $config_dir/*.nginx.conf;
EOL

# enabling pm2 apps to run on startup
pm2 startup

# running node app
pm2 start web/index.js --name express-load-balancer

# auto starting load balancer with computer restart
pm2 save

user=`who | awk '{print $1;}'` #getting the current username

# allowing nginx commands to run without password
echo "$user ALL=(ALL) NOPASSWD: /etc/init.d/nginx" | sudo EDITOR='tee -a' visudo

shutdown -r now

exit