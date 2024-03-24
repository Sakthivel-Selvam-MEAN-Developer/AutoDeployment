## basic setup
1. RDS is managed manually in aws console
2. EC2 is managed through terraform
3. gandi dns mapping is managed through terraform
4. entire application runs using docker compose. this includes the following services:
   1. nginx
   2. backend through pm2
   3. frontend packed into nginx assets
   
## Boot Strap EC2 machine
```bash
# get into terragrent docker shell
# set compose vars from keepass secret
y terra
# install dependencies
terragrunt init
# look for changes
terragrunt plan
# apply changes
# be very very careful with this command. this could destroy the entire infrastructure
terragrunt apply
```


## Certificate Generation

```bash
docker compose run --rm certbot certonly --manual --preferred-challenges -d 'auth.magnum.wondermove.in,magnum.wondermove.in'
```
1. The above command will generate a certificate for the domain `magnum.wondermove.in` and `auth.magnum.wondermove.in`
   1. repace the domain with the domain you want to generate the certificate for
2. once you do this, it will prompt you to update the dns records for the domain. in gandi. 
3. on completetion certificated will be generated in the following location
   1. `./docker/certs/live/<domain-name>/fullchain.pem`
   2. `./docker/certs/live/<domain-name>/privkey.pem`
4. Copy this to the `./nginx/certs/` folder
5. Run deploy.sh which will copy the certs to the correct location in the ec2 machine