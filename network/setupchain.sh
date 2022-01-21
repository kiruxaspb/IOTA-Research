#!/bin/bash
echo "--------Setup chain...---------"
echo "---------------------------------"
echo "Input number node:"
read nnode
cd /wasp
wasp-cli init
wasp-cli set goshimmer.api 127.0.0.1:8080
wasp-cli set wasp.$nnode.api 127.0.0.1:9090
wasp-cli set wasp.$nnode.nanomsg 127.0.0.1:5550
wasp-cli set wasp.$nnode.peering 127.0.0.1:4000
wasp-cli peering info
wasp-cli peering list-trusted
echo "Input pubkey for peering:"
read pubkey
wasp-cli peering trust $varname 127.0.0.1:4000
wasp-cli peering list-trusted
wasp-cli request-funds
wasp-cli chain deploy --committee=0 --quorum=1 --chain=mychain --description="IOTACHAIN"
echo "Input wallet address:"
read wallet
wasp-cli chain evm deploy -a mychain --alloc $wallet:1000000000000000000000000
sleep 5
wasp-cli chain evm jsonrpc --chainid 1074
