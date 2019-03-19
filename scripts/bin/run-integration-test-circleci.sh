#!/bin/bash
set -ex

GECKODRIVER_URL=$(
  curl -s 'https://api.github.com/repos/mozilla/geckodriver/releases/latest' |
  python -c "import sys, json; r = json.load(sys.stdin); print([a for a in r['assets'] if 'linux64' in a['name']][0]['browser_download_url']);"
);


curl -L -o geckodriver.tar.gz $GECKODRIVER_URL
gunzip -c geckodriver.tar.gz | tar xopf -
chmod +x geckodriver
sudo mv geckodriver /bin
geckodriver --version
# Install pip
sudo apt-get install python-pip
sudo pip install --upgrade pip

sudo pip install mozdownload mozinstall==1.15

mkdir -p ~/project/firefox-downloads/
find  ~/project/firefox-downloads/ -type f -mtime +90 -delete
mozdownload --version latest --type daily --destination ~/project/firefox-downloads/firefox_nightly/

export PATH=~/project/firefox:$PATH
mozinstall $(ls -t firefox-downloads/firefox_nightly/*.tar.bz2 | head -1)
firefox --version
npm run ${INTEGRATION_TEST_JOB}
