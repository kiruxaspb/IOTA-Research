#!/bin/bash
echo "--------Setup network...---------"
echo "---------------------------------"
git clone -b develop https://github.com/iotaledger/wasp.git
sleep 60
cd wasp
make install
sleep 300
sudo docker build -t wasp-node .
sleep 180
cd ..
cd /tools/devnet
sudo docker-compose up
sleep 120
echo "---wasp+go shimmer was started---"
