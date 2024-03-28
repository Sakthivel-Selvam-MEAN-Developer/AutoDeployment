set -e
yarn
yarn b prismaUp
yarn b prismaMigrateDev
yarn b prismaGenCheck
yarn b pris
cp -r web/dist/* ./nginx/html/
