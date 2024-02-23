set -e
yarn
yarn b prismaUp
yarn b pris
yarn b seedDevDb
cp -r web/dist/* ./nginx/html/