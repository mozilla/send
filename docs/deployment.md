## Summary

This document describes how to do a full deployment of Firefox Send on your own Linux server. It was written with Debian/Ubuntu and Apache in mind but can be adapted for other distributions and webservers as well.

## Requirements

In order to deploy Firefox Send on your server, you will need:

* A server set up with a firewall (highly recommended) and a non-root User with sudo access
* Git
* An Apache webserver
* Node.js *v10.x* and NPM
* Optionally telnet, to be able to quickly check your installation
* Certbot, to get a SSL/TLS Certificates (highly recommended)


## Building

### Packages Installation

We assume you already have a server set up with a firewall and a non-root User with sudo access. If this is not the case, take a look at [this guide](https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-18-04).

First, install the required packages with Apt:

```sh
sudo apt install git apache2 telnet
```

Next, we need to install Node.js. Your repository's version is probably not the one we need (v.10.x), therefore make sure to download it from the official Node.js binary distributions by [NodeSource](https://github.com/nodesource/distributions/blob/master/README.md#deb):


*Node.js v10.x:*

```sh
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs

# Using Debian, as root
curl -sL https://deb.nodesource.com/setup_10.x | bash -
apt-get install -y nodejs

# Make sure you've got the right version (v.10.xx.x)
nodejs -v

# Just in case, install build-essential for npm packages that require compiling code from source
sudo apt install build-essential
```

Note that with the command above, NPM will be installed as well.


### Building Firefox Send

During its installation, Apache probably deployed a test website under `/var/www/html`. In this instruction page we will use this directory for simplicity's sake but feel free to create and configure a new virtual-host to suit your needs.

```sh
# Move to the www directory
cd /var/www

# Git clone Firefox Send to the html folder
git clone https://github.com/mozilla/send.git html
```

You may encounter permissions error. If so, do not use 'sudo' to clone the repository! Firefox Send and/or Node.js probably won't work well or at all with directorys/files owned by root.
Instead, create a new folder and modify its permissions or modify the permissions of the current folder (replace `your_user` with the name of your non-root User with sudo access):

```sh
sudo mkdir html
sudo chown -R your_user:www-data html/

# You should be able to git clone now
git clone https://github.com/mozilla/send.git html
```

For more information about website folders permissions, please [check here](https://serverfault.com/a/357109).

Please note as well that the reason we use a separate user and group is because user `www-data` is set to `/usr/sbin/nologin` which means you are not supposed to use it as a regular shell. Bellow we will create a script to launch Firefox Send, which we will need to run with your User (`your_user` in this document).

We are now ready to install and build Firefox Send!

```sh
# Move to the newly cloned directory
cd html

# Install and build with NPM
npm install
npm run build
```

Check for errors on your shell, if any. The error log should help you find out what went wrong.


## Running

We will create a script in order to have a permanently running version of Firefox Send as a background process.

The folder from which the script is launched doesn't matter much but it is better to put it outside your website folder. That way you won't have to recreate it after a `git pull`.

```sh
cd ~
touch run_firefoxsend.sh
```

*run_firefoxsend.sh*
```sh
#!/usr/bin/env bash

# Variables
export FFSEND_PATH='/var/www/html'

nohup npm run prod --prefix $FFSEND_PATH >/dev/null &
```

Make it executable and run it:

```sh
chmod +x run.sh
./run.sh
```

_Tip:_ One can also use [PM2](https://pm2.keymetrics.io/) to better manage the application startup.

Now the Firefox Send backend should be running on port 1443. You can check with:

```sh
telnet localhost 1443
```

*Note:* if you see an error, check either your firewall rules and if you correctly launched Firefox Send. Also, after successfully testing, remember to close the port 1443 and purge telnet if you don't use it anymore.


## Reverse Proxy

Of course, we don't want to expose the service on port 1443. Instead we want our normal webserver to forward all requests to Firefox send ("Reverse proxy").

### Apache webserver

You first need to activate several Apache modules (you probably need to use `sudo`):

```sh
a2enmod proxy
a2enmod proxy_http
a2enmod proxy_wstunnel
```

In your Apache virtual host configuration file, insert this just before `</VirtualHost>`:

```
    # Enable rewrite engine
    RewriteEngine on

    # Make sure the original domain name is forwarded to Send
    # Otherwise the generated URLs will be wrong
    ProxyPreserveHost on

    # Make sure the generated URL is https://
    RequestHeader set X-Forwarded-Proto https

    # If it's a normal file (e.g. PNG, CSS) just return it
    RewriteCond %{REQUEST_FILENAME} -f
    RewriteRule .* - [L]

    # If it's a websocket connection, redirect it to a Send WS connection
    RewriteCond %{HTTP:Upgrade} =websocket [NC]
    RewriteRule /(.*) ws://127.0.0.1:1443/$1 [P,L]

    # Otherwise redirect it to a normal HTTP connection
    RewriteRule ^/(.*)$ http://127.0.0.1:1443/$1 [P,QSA]
    ProxyPassReverse  "/" "http://127.0.0.1:1443"
```

Restart Apache with `sudo systemctl restart apache2`. You should be able to access your website with your server IP address or domain name if you already set it up.

*Note:* check your firewall rules and open port 80 to access your page. `sudo ufw allow 'Apache Full'` should do the trick. Apache Full means both 80 (http) and 443 (https) will be open.

You should now be able to use Firefox Send on your server!

While not mandatory, it is highly advised to setup a TLS certificate for your website in order to make it accessible with HTTPS.


## SSL/TLS Certificate (HTTPS)

For this document we will use Certbot to get a Let's Encrypt TLS certificate for your website. However you can use whichever certificate you like.

Make sure you have a domain name, and DNS records pointing to your server. For this document we will use the subdomain `send.example.com`.

In the Apache virtual host configuration file we edited on the step above, make sure to set the `ServerName` directive just after `<VirtualHost *:80>`:

```
ServerName send.example.com
```

Reload Apache settings with `sudo systemctl reload apache2` to apply your new setting.

Follow the instruction bellow to get your certificate:

```sh
# Add the Certbot repository
sudo add-apt-repository ppa:certbot/certbot

# Install Certbot Apache package
sudo apt install python-certbot-apache

# Obtain your certificate
sudo certbot --apache -d send.example.com
```

The first time you will be asked to agree to the terms of service and your email address. You will also be asked if you'd like Cerbot to configure redirect HTTP traffic to HTTPS, which is recommanded, but better done manually if you have a heavily modified Virtual Host settings.

You should now be able to access your Firefox Send instance over HTTPS.

*Note:* Check your firewall settings; you won't be able to access your website if HTTPS port (443) is closed.

Final step, it is recommanded to check if auto-renewal works with `sudo certbot renew --dry-run`.

For more information about Certbot configuration, please check the [official documentation](https://certbot.eff.org/docs/).
