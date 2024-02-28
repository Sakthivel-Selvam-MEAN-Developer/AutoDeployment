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