#!/usr/bin/env bash

apt-get update
apt-get install -y build-essential git ruby1.9.3 && sudo gem install github-pages --no-ri --no-rdoc
apt-get install -y python-software-properties python g++ make
add-apt-repository -y ppa:chris-lea/node.js
apt-get update
apt-get install -y nodejs