set -e
yarn
yarn b prismaUp
cp -r web/dist/* ./nginx/html/