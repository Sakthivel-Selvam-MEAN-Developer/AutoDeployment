sudo yum install docker python3-pip nodejs
pip3 install docker-compose
sudo systemctl enable docker.service
sudo systemctl start docker.service
sudo chmod 666 /var/run/docker.sock
sudo npm install -g corepack
corepack enable
cd WonderWhy/
yarn
