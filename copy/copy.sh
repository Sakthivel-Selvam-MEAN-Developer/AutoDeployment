#Remove existing files and dir from nginx/html

echo "removing files and dir"
rm -rf ~/Desktop/Demo/WonderWhy/nginx/html/*

#copy files and dir from web/dist to nginx/html

echo "start coping files and dir"
cp -r ~/Desktop/Demo/WonderWhy/web/dist/* ~/Desktop/Demo/WonderWhy/nginx/html/
echo "copying end"
