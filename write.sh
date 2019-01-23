#!/bin/bash

for filename in ./_public/routes/*.js; do
    node "$filename"
done
