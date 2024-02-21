set -e
yarn install
yarn b prismaUp
yarn u build
cp -r build/* ./nginx/html/