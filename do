#!/bin/bash
die() {
    echo $1
    exit 100
}

NODE=`which node` || NODE=`which nodejs` || die 'cannot find node js'
$NODE ./lib/make.js $NODE
