## Docker Compose Installation
```shell
brew install colima
brew install docker docker-compose
brew services start colima
mkdir -p ~/.docker/cli-plugins/
ln -sfn /usr/local/opt/docker-compose/bin/docker-compose ~/.docker/cli-plugins/docker-compose
```

### Start postgres
```shell
docker-compose up
## connect to db
docker-compose exec db psql
## connect to db from local
psql -h 127.0.0.1 -U postgres -p 15432
## chumma
```