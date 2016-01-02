#!/bin/bash

NODE_ENV="production" gulp build
git add --all
git commit -m $1
git push origin master
