 #exit if error
set -e

export IP=18.215.179.172

echo "remove old copy"
rm -rf WonderWhy
echo "update pem key permission"
## get pem key from secrets using keepass
chmod 400 ~/.ssh/awsww.pem
echo "clone latest code without history"
git clone --depth 1 git@github.com:WonderWhyDev/WonderWhy.git
echo "copy code to aws server"
rsync -avz  -e 'ssh -i ~/.ssh/awsww.pem' WonderWhy  ec2-user@"$IP":~/
echo "copy secrets to aws server"
rsync -avz  -e 'ssh -i ~/.ssh/awsww.pem' ~/work/wonderWhy/backend/.env.aws  ec2-user@"$IP":~/WonderWhy/backend/.env
echo "install all dependencies"
ssh -i ~/.ssh/awsww.pem ec2-user@"$IP"  << EOF
  set -e
  sudo yum update
  sudo yum install -y docker
  curl -SL https://github.com/docker/compose/releases/download/v2.24.6/docker-compose-linux-aarch64 -o ~/docker-compose
  chmod +x ~/.local/bin/docker-compose
  ~/docker-compose version
  echo "install docker complete"
  sudo systemctl enable docker.service
  sudo systemctl start docker.service
  echo "set docker auto start"
  sudo chmod 666 /var/run/docker.sock
  cd ~/WonderWhy
  echo "start yarn install and prisma setup"
  ~/docker-compose up setup
  echo "start db migration"
  ~/docker compose up migrate
  echo "start nginx along with backend"
  ~/docker compose up nginx
EOF