set -e
yarn
yarn b prismaUp
yarn u build
cp -r build/* ./nginx/html/