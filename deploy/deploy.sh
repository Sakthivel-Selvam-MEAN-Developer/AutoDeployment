 #exit if error
set -e

IP=$1

echo "remove old copy"
rm -rf wonderWhy
echo "update pem key permission"
## get pem key from secrets using keepass
chmod 400 ~/.ssh/wonderWhy.pem
echo "clone latest code without history"
git clone --depth 1 git@github.com:WonderWhyDev/wonderWhy.git
echo "copy code to aws server"
rsync -avz  -e 'ssh -i ~/.ssh/wonderWhy.pem' wonderWhy  ec2-user@"$IP":~/
echo "copy secrets to aws server"
rsync -avz  -e 'ssh -i ~/.ssh/wonderWhy.pem' ~/work/wonderWhy/backend/.env.aws  ec2-user@"$IP":~/wonderWhy/backend/.env
rsync -avz  -e 'ssh -i ~/.ssh/wonderWhy.pem' ~/work/wonderWhy/keycloak/keycloak.aws.conf  ec2-user@"$IP":~/wonderWhy/keycloak/keycloak.conf
rsync -avz  -e 'ssh -i ~/.ssh/wonderWhy.pem' ~/work/wonderWhy/web/dist/*  ec2-user@"$IP":~/wonderWhy/nginx/html/
rsync -avz  -e 'ssh -i ~/.ssh/wonderWhy.pem' ~/work/wonderWhy/backend/dist/*  ec2-user@"$IP":~/wonderWhy/backend/dist/
echo "install all dependencies"
ssh -t -i ~/.ssh/wonderWhy.pem ec2-user@"$IP"  << EOF
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
  cd ~/wonderWhy
  ~/docker-compose down
  echo "start yarn install and prisma setup"
  ~/docker-compose up setup
  echo "start db migration"
  ~/docker-compose up migrate
  echo "start keycloak"
  ~/docker-compose up keycloak -d
  echo "update keycloak"
  ~/docker-compose exec keycloak sh -c '/config/waitForKeycloak.sh'
  echo "start nginx along with backend"
  ~/docker-compose up nginx -d
EOF
