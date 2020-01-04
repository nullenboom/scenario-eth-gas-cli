#!/usr/bin/env bash

testrpc_port=$1; 
#definedport

start_testrpc() {
  npx ganache-cli -p $testrpc_port --gasLimit 8000000 "${accounts[@]}" > /dev/null &
  testrpc_pid=$!
}

echo "Starting our own ganache-cli instance"
start_testrpc


echo "now sleep 5"
echo "Port: $testrpc_port"
sleep 20

echo "awake"