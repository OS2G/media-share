#!/bin/bash

if [ -z $1 ]; then
	echo "Must provide an action" >&2
	exit 1
fi

if [[ "$1" == "clean" ]]; then
	rm -rf client/assets
	exit 0
fi

if [[ "$1" == "install" ]]; then
	mkdir -p client/assets/css
	mkdir -p client/assets/js

	cp node_modules/bootstrap/dist/css/bootstrap.min.css client/assets/css

	cp node_modules/socket.io-client/dist/socket.io.min.js client/assets/js
	cp node_modules/jquery/dist/jquery.min.js client/assets/js
	cp node_modules/bootstrap/dist/js/bootstrap.bundle.min.js client/assets/js
fi