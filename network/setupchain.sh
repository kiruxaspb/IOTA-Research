#!/bin/bash
echo "--------Setup chain...---------"
echo "---------------------------------"
cd /wasp
wasp-cli init
wasp-cli set goshimmer.api 127.0.0.1:8080
wasp-cli set wasp.0.api 127.0.0.1:9090
wasp-cli set wasp.0.nanomsg 127.0.0.1:5550
wasp-cli set wasp.0.peering 127.0.0.1:4000
wasp-cli peering info
wasp-cli peering list-trusted
echo "input your pubkey:"
read pubkey
wasp-cli peering trust $varname 127.0.0.1:4000
wasp-cli peering list-trusted
wasp-cli request-funds
wasp-cli chain deploy --committee=0 --quorum=1 --chain=mychain --description="IOTACHAIN"
echo "input your wallet:"
read wallet
wasp-cli chain evm deploy -a mychain --alloc $wallet:1000000000000000000000000
sleep 5
wasp-cli chain evm jsonrpc --chainid 1074
