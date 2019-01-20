#!/bin/bash
# Express Load Balancer Installer

# Check if running with sudo
if [ "x$(id -u)" != 'x0' ]; then
  echo 'Error: Please run this script with sudo privileges'
  exit 1
fi

#checking if running on one of supported OS
case $(head -n1 /etc/issue | cut -f 1 -d ' ') in
  Ubuntu) os="ubuntu";;
  *) echo 'OS Not supported. Please try alternate download methods'
esac

# running OS specific installer
bash installers/$os.sh $*

exit