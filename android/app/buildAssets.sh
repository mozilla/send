#!/usr/bin/env bash
if [ -d "../../node_modules" ]
then
  echo "node_modules already present."
else
  echo "node_modules not present, running npm install."
  npm install
fi
npm run build
rm -rf src/main/assets
mkdir -p src/main/assets
cp -R ../../dist/* src/main/assets
cp -R ../../borderify src/main/assets