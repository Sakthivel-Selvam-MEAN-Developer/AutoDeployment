 #exit if error
set -e

IP=$1

echo "remove old copy"
rm -rf WonderWhy
echo "update pem key permission"
## get pem key from secrets using keepass
chmod 400 ~/.ssh/wonderwhy.pem
echo "clone latest code without history"
git clone --depth 1 git@github.com:WonderWhyDev/WonderWhy.git
echo "copy code to aws server"
rsync -avz  -e 'ssh -i ~/.ssh/wonderwhy.pem' WonderWhy  ec2-user@"$IP":~/
echo "copy secrets to aws server"
rsync -avz  -e 'ssh -i ~/.ssh/wonderwhy.pem' ~/work/wonderWhy/backend/.env.aws  ec2-user@"$IP":~/WonderWhy/backend/.env
rsync -avz  -e 'ssh -i ~/.ssh/wonderwhy.pem' ~/work/wonderWhy/web/dist/*  ec2-user@"$IP":~/WonderWhy/web/dist/
rsync -avz  -e 'ssh -i ~/.ssh/wonderwhy.pem' ~/work/wonderWhy/backend/dist/*  ec2-user@"$IP":~/WonderWhy/backend/dist/
echo "install all dependencies"
ssh -i ~/.ssh/wonderwhy.pem ec2-user@"$IP"  << EOF
  set -e
  sudo yum update
  sudo yum install -y docker
  curl -SL https://github.com/docker/compose/releases/download/v2.24.6/docker-compose-linux-aarch64 -o ~/docker-compose
  chmod +x ~/docker-compose
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
  ~/docker-compose up migrate
  echo "start nginx along with backend"
  ~/docker-compose up nginx -d
EOF
