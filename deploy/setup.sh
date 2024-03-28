set -e
yarn
yarn b prismaUp
yarn b pris
cp -r web/dist/* ./nginx/html/
